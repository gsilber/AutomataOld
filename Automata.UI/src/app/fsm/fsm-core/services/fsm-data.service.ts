import { FsmTransition } from './../classes/fsm-transition';
import { FsmState, StateTypes, DefaultStateLabel } from './../classes/fsm-state';
import { Injectable } from '@angular/core';
import { Fsm } from '../classes/fsm';

// Exported classes and enums used by the service


// Service code
@Injectable()
export class FsmDataService {
  // public member variables
  private _fsm: Fsm = new Fsm();

  public get isMachineValid() {
    return this._fsm.valid;
  }
  public get isDeterministic(): boolean {
    return this._fsm.deterministic;
  }
  public get states() { return this._fsm.fsmStates; }
  public get transitions() { return this._fsm.fsmTransitions; }

  constructor() {
  }

  // public methods for states
  public addDefaultState = (x: number, y: number, deterministic = false): FsmState => {
    const stateList = this._fsm.fsmStates;
    let count = 0;
    const objCheck = {};
    for (const state of stateList) {
      count++;
      objCheck[state.stateIndex] = state;
    }
    let calcIndex = count;
    for (let i = 0; i < count; i++) {
      if (!objCheck[i]) {
        calcIndex = i;
        break;
      }
    }
    const calcName = DefaultStateLabel + calcIndex;
    return this._fsm.addState({
      name: calcName,
      stateIndex: calcIndex,
      x: x,
      y: y,
      stateType: StateTypes.NORMAL
    });
  }

  public getStateLabelError(state: FsmState) {
    return this._fsm.stateLabelError(state);
  }

  public removeState(state: FsmState) {
    this._fsm.removeState(state);
  }

  // public methods for transitions
  public addTransition(src: FsmState, dest: FsmState, char: string = 'a') {
    return this._fsm.addTransition(src, dest, char);
  }

  public removeTransition(transition: FsmTransition) {
    this._fsm.removeTransition(transition);
  }

  // public methods for FSM
  public maxPos = () => this._fsm.maxPos;
  public clearFsm = () => this._fsm.clear();
  public toJson = () => JSON.stringify(this._fsm.asSerializableObject());
  public fromJson = (data: string) => this._fsm.fromSerializableObject(JSON.parse(data));
}
