import { Injectable } from '@angular/core';

export enum StateTypes { START = 'start', FINAL = 'final', NORMAL = 'normal', STARTFINAL = 'startfinal' }

export class FsmObject {
  public type: string;
}
export class FsmState extends FsmObject {
  public x: number;
  public y: number;
  public stateIndex: number;
  public name: string;
  public stateType: StateTypes = StateTypes.NORMAL;
}

export class FsmTransition extends FsmObject {
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

  public static setStateValue(item: FsmState, valueType: StateTypes, remove: boolean = false) {
    switch (item.stateType) {
      case StateTypes.NORMAL:
        if (!remove) {
          item.stateType = valueType;
        }
        break;
      case StateTypes.START:
        if (valueType === StateTypes.FINAL && !remove) {
          item.stateType = StateTypes.STARTFINAL;
        }
        if (valueType === StateTypes.START && remove) {
          item.stateType = StateTypes.NORMAL;
        }
        break;
      case StateTypes.FINAL:
        if (valueType === StateTypes.START && !remove) {
          item.stateType = StateTypes.STARTFINAL;
        }
        if (valueType === StateTypes.FINAL && remove) {
          item.stateType = StateTypes.NORMAL;
        }
        break;
      case StateTypes.STARTFINAL:
        if (valueType === StateTypes.START && remove) {
          item.stateType = StateTypes.FINAL;
        }
        if (valueType === StateTypes.FINAL && remove) {
          item.stateType = StateTypes.START;
        }
    }
  }

  public static toggleStateValue(item: FsmState, valueType: StateTypes) {
    switch (item.stateType) {
      case StateTypes.NORMAL:
        switch (valueType) {
          case StateTypes.START:
            item.stateType = StateTypes.START;
            break;
          case StateTypes.FINAL:
            item.stateType = StateTypes.FINAL;
            break;
        }
        break;
      case StateTypes.START:
        switch (valueType) {
          case StateTypes.START:
            item.stateType = StateTypes.NORMAL;
            break;
          case StateTypes.FINAL:
            item.stateType = StateTypes.STARTFINAL;
        }
        break;
      case StateTypes.FINAL:
        switch (valueType) {
          case StateTypes.START:
            item.stateType = StateTypes.STARTFINAL;
            break;
          case StateTypes.FINAL:
            item.stateType = StateTypes.NORMAL;
        }
        break;
      case StateTypes.STARTFINAL:
        switch (valueType) {
          case StateTypes.START:
            item.stateType = StateTypes.FINAL;
            break;
          case StateTypes.FINAL:
            item.stateType = StateTypes.START;
        }
        break;
    }
  }

  public validateLabel(state: FsmState): boolean {
    if (state.name.length === 0) { return false; }
    for (const item of this.fsmStates) {
      if (item !== state && item.name === state.name) { return false; }
    }
    return true;
  }
  public clear = () => {
    this.fsmStates = [];
    this.fsmTransitions = [];
  }
  public addState = (state: FsmState): FsmState => {
    this.fsmStates.push(state);
    return state;
  }

  public addTransition = (source: FsmState, dest: FsmState) => {
    this.fsmTransitions.push({ sourceState: source, destState: dest, charactersAccepted: '', type: 'transition' });
  }

  public addDefaultState = (x: number, y: number): FsmState => {
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

    return this.addState({
      name: calcName,
      stateIndex: calcIndex,
      x: x,
      y: y,
      stateType: StateTypes.NORMAL,
      type: 'state'
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
