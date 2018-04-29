import { FsmTransition } from './../classes/fsm-transition';
import { FsmState, StateTypes, DefaultStateLabel } from './../classes/fsm-state';
import { Injectable } from '@angular/core';
import { Fsm } from '../classes/fsm';

// Exported classes and enums used by the service


// Service code
@Injectable()
export class FsmDataService {
  // public member variables
  private _userFsm: Fsm = new Fsm();
  private _deterFsm: Fsm = new Fsm();

  public get userFsm() { return this._userFsm; }

  constructor() {
  }


  // public methods for states
  public addDefaultState = (x: number, y: number, deterministic = false): FsmState => {
    const stateList = this._userFsm.fsmStates;
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
    return this._userFsm.addState({
      name: calcName,
      stateIndex: calcIndex,
      x: x,
      y: y,
      stateType: StateTypes.NORMAL
    });
  }

  // public methods for FSM
  public clearFsms() {
    this._userFsm.clear();
    this._deterFsm.clear();
  }
  public toJson = () => JSON.stringify(this._userFsm.asSerializableObject());
  public fromJson = (data: string) => this._userFsm.fromSerializableObject(JSON.parse(data));
}
