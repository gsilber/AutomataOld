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
}

export class FsmTransition extends FsmObject {
  private transitionData: FsmTransitionData;
  public dirty = true;
  public get sourceState(): FsmState { return this.transitionData.sourceState; }
  public get destState(): FsmState { return this.transitionData.destState; }
  public get charactersAccepted(): string { return this.transitionData.charactersAccepted; }
  public set charactersAccepted(chars: string) {
    const oldchars = this.charactersAccepted;
    this.transitionData.charactersAccepted = chars;
    if (this.charactersError.length > 0) {
      this.transitionData.charactersAccepted = oldchars;
      this.dirty = true;
    }
  }
  public get characterMap(): string[] { return this.transitionData.characterMap; }
  public get rotation(): number { return this.transitionData.rotation; }

  public get charactersError() {
    if (this.charactersAccepted.length === 0) { return 'Invalid accept set'; }
    const result = /^(([\s\S]|[\s\S]-[\s\S])(\,([\s\S]|[\s\S]-[\s\S]))*)$/g.test(this.charactersAccepted);
    if (!result) { return 'Invalid accept set'; }
    // Here we need to check for duplicate values in the accept string and build character map.
    const sChars = this.charactersAccepted;
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
    this.type = 'transition';
  }

  setRotation(rotation: number) {
    this.transitionData.rotation = rotation;
    this.dirty = true;
  }

  asSerializableObject() {
    return {
      sourceState: this.sourceState.asSerializableObject(),
      destState: this.destState.asSerializableObject(),
      charactersAccepted: this.charactersAccepted,
      characterMap: this.characterMap,
      rotation: this.rotation
    };
  }
}
