import { Injectable } from '@angular/core';

export enum StateTypes { START = 'start', FINAL = 'final', NORMAL = 'normal', STARTFINAL = 'startfinal' }

export class FsmState {
  public x: number;
  public y: number;
  public stateIndex: number;
  public name: string;
  public stateType: StateTypes = StateTypes.NORMAL;

  constructor() { }
}

export class FsmTransition {
  public sourceState: FsmState;
  public destState: FsmState;
  // this can be a comma seperated list of characters or a RegEx character classes (i.e. a,b or [a..z] or [abc])
  public charactersAccepted = '';
  public rotation ?= 0;
}


@Injectable()
export class FsmDataService {
  // public fsmStates: FsmState[] = [{ x: 50, y: 50, stateIndex: 0, name: 'q0', stateType: StateTypes.NORMAL }];
  public fsmStates: FsmState[] = [];
  public fsmTransitions: FsmTransition[] = [];
  public defaultStateLabel = 'q';
  constructor() { }

  public static toggleState(item: FsmState) {
    switch (item.stateType) {
      case StateTypes.NORMAL: {
        item.stateType = StateTypes.FINAL;
        break;
      }
      case StateTypes.FINAL: {
        item.stateType = StateTypes.START;
        break;
      }
      case StateTypes.START: {
        item.stateType = StateTypes.STARTFINAL;
        break;
      }
      case StateTypes.STARTFINAL: {
        item.stateType = StateTypes.NORMAL;
        break;
      }
    }
  }

  public addState = (state: FsmState) => {
    this.fsmStates.push(state);
  }

  public addTransition = (source: FsmState, dest: FsmState) => {
    this.fsmTransitions.push({ sourceState: source, destState: dest, charactersAccepted: '' });
  }

  public addDefaultState = (x: number, y: number) => {
    let count = 0;
    const objCheck = {};
    for (const state of this.fsmStates) {
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
    const calcName = this.defaultStateLabel + calcIndex;

    this.addState({
      name: calcName,
      stateIndex: calcIndex,
      x: x,
      y: y,
      stateType: StateTypes.NORMAL
    });
  }

  public removeTransition(transition: FsmTransition) {
    const index = this.fsmTransitions.indexOf(transition);
    if (index > -1) {
      this.fsmTransitions.splice(index, 1);
    }
  }

  private removeTransitionsForState(state: FsmState) {
    this.fsmTransitions = this.fsmTransitions.filter(
      function (item) { return item.sourceState !== state && item.destState !== state; });
  }

  public removeState(state: FsmState) {
    const index = this.fsmStates.indexOf(state);
    if (index > -1) {
      this.fsmStates.splice(index, 1);
    }
  }
}
