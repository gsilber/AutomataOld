import { FsmTransition } from './fsm-transition';
import { FsmObject } from './fsm-object';

export enum StateTypes { START = 'start', FINAL = 'final', NORMAL = 'normal', STARTFINAL = 'startfinal' }

const stateProgression: StateTypes[] = [StateTypes.NORMAL, StateTypes.FINAL, StateTypes.START, StateTypes.STARTFINAL];
export const DefaultStateLabel = 'q';


export class FsmStateData {
  public x: number;
  public y: number;
  public stateIndex: number;
  public name: string;
  public stateType: StateTypes = StateTypes.NORMAL;
}

export class FsmState extends FsmObject {
  private stateData: FsmStateData = new FsmStateData();
  public outboundTransitions: FsmTransition[] = [];

  constructor(data: FsmStateData) {
    super();
    this.stateData = data;
    this.type = 'state';
  }

  // public properites
  public get x(): number { return this.stateData.x; }
  public get y(): number { return this.stateData.y; }
  public get stateIndex(): number { return this.stateData.stateIndex; }
  public get name(): string { return this.stateData.name; }
  public set name(name: string) { this.stateData.name=name; }
  public get stateType(): StateTypes { return this.stateData.stateType; }

  public get startState(): boolean {
    return this.stateType === StateTypes.START || this.stateType === StateTypes.STARTFINAL;
  }
  public set startState(startValue: boolean) {
    if (startValue) {
      if (this.stateType === StateTypes.FINAL) { this.stateData.stateType = StateTypes.STARTFINAL; }
      if (this.stateType === StateTypes.NORMAL) { this.stateData.stateType = StateTypes.START; }
    } else {
      if (this.stateType === StateTypes.START) { this.stateData.stateType = StateTypes.NORMAL; }
      if (this.stateType === StateTypes.STARTFINAL) { this.stateData.stateType = StateTypes.FINAL; }
    }
  }
  public get finalState(): boolean {
    return this.stateType === StateTypes.FINAL || this.stateType === StateTypes.STARTFINAL;
  }
  public set finalState(startValue: boolean) {
    if (startValue) {
      if (this.stateType === StateTypes.START) { this.stateData.stateType = StateTypes.STARTFINAL; }
      if (this.stateType === StateTypes.NORMAL) { this.stateData.stateType = StateTypes.FINAL; }
    } else {
      if (this.stateType === StateTypes.FINAL) { this.stateData.stateType = StateTypes.NORMAL; }
      if (this.stateType === StateTypes.STARTFINAL) { this.stateData.stateType = StateTypes.START; }
    }
  }
  public get labelError(): string {
    if (this.name.length === 0 || this.name.length > 3) { return 'Not a valid label name'; }
    if (this.name.startsWith(DefaultStateLabel) && this.name !== DefaultStateLabel + this.stateIndex) {
      return 'Names beginning with ' + DefaultStateLabel + ' are reserved';
    }
    return '';
  }

  // public methods
  public toggleState() {
    let curPos = stateProgression.indexOf(this.stateType) + 1;
    if (curPos >= stateProgression.length) {
      curPos = 0;
    }
    this.stateData.stateType = stateProgression[curPos];
  }

  public toggleStateValue(value: StateTypes) {
    if (value === StateTypes.START) { this.startState = !this.startState; }
    if (value === StateTypes.FINAL) { this.finalState = !this.finalState; }
  }

  public updateValues(name: string, type: StateTypes) {
    this.stateData.name = name;
    this.stateData.stateType = type;
  }

  public updatePosition(x: number, y: number) {
    this.stateData.x = x;
    this.stateData.y = y;
  }

  public asSerializableObject() {
    return {
      x: this.x,
      y: this.y,
      stateIndex: this.stateIndex,
      name: this.name,
      stateType: this.stateType
    };
  }
}
