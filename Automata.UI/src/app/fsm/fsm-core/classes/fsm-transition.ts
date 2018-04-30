import { EventEmitter } from '@angular/core';
import { FsmState } from './fsm-state';
import { FsmObject } from './fsm-object';

export class FsmTransitionData {
  public sourceState: FsmState;
  public destState: FsmState;
  // this can be a comma seperated list of characters or a RegEx character classes (i.e. a,b or [a..z] or [abc])
  public charactersAccepted = '';
  public characterMap?: string[] = [];
  public rotation = 0;
  public epsilon = false;
}

export class FsmTransition extends FsmObject {
  private transitionData: FsmTransitionData;
  public dirty = true;
  private attemptChars: string;
  public get sourceState(): FsmState { return this.transitionData.sourceState; }
  public get destState(): FsmState { return this.transitionData.destState; }
  public get charactersAccepted(): string { return this.transitionData.charactersAccepted; }

  public set charactersAccepted(chars: string) {
    this.attemptChars = chars;
    const oldchars = this.charactersAccepted;
    this.transitionData.charactersAccepted = chars;
    if (this.charactersError.length > 0) {
      this.transitionData.charactersAccepted = oldchars;
    } else { this.dirty = true; }
  }
  public get characterMap(): string[] { return this.transitionData.characterMap; }
  public get rotation(): number { return this.transitionData.rotation; }
  public set rotation(rotation: number) { this.transitionData.rotation = rotation; this.dirty = true; }


  public get epsilon(): boolean { return this.transitionData.epsilon; }
  public set epsilon(val: boolean) {
    if (val !== this.epsilon) {
      if (val) {
        this.transitionData.charactersAccepted = '';
        this.transitionData.characterMap = [];
      } else {
        this.transitionData.charactersAccepted = 'a';
        this.transitionData.characterMap = ['a'];
        this.attemptChars = 'a';
      }
      this.transitionData.epsilon = val;
      this.dirty = true;
    }
  }

  public get charactersError() {
    if (this.epsilon) { return ''; }
    if (this.attemptChars.length === 0) { return 'Invalid accept set'; }
    const result = /^(([\s\S]|[\s\S]-[\s\S])(\,([\s\S]|[\s\S]-[\s\S]))*)$/g.test(this.attemptChars);
    if (!result) { return 'Invalid accept set'; }
    // Here we need to check for duplicate values in the accept string and build character map.
    const sChars = this.attemptChars;
    const aChars = sChars.split(',');
    const map = [];
    let flag = false;
    aChars.forEach(charClass => {
      if (charClass.length === 1) {
        map.push(charClass);
      }
      if (charClass.length > 1 && charClass[1] === '-') {
        const start = charClass.charCodeAt(0);
        const end = charClass.charCodeAt(charClass.length - 1);
        if (start > end) {
          flag = true;
        } else {
          for (let i = start; i <= end; i++) {
            const char = String.fromCharCode(i);
            map.push(char);
          }
        }
      }
    });
    if (flag) { return 'Invalid character range in set'; }
    const unique = map.every((elem, i, array) => array.lastIndexOf(elem) === i);
    if (!unique) { return 'Duplicate values in set'; }
    this.transitionData.characterMap = map;
    return '';
  }

  constructor(data: FsmTransitionData) {
    super();
    this.transitionData = data;
    this.attemptChars = this.charactersAccepted;
    this.type = 'transition';
  }

  asSerializableObject(): any {
    return {
      sourceState: this.sourceState.asSerializableObject(),
      destState: this.destState.asSerializableObject(),
      charactersAccepted: this.charactersAccepted,
      characterMap: this.characterMap,
      rotation: this.rotation,
      epsilon: this.epsilon
    };
  }
}
