import { FsmDrawTransitionComponent } from './../../fsm-draw/components/fsm-draw-transition/fsm-draw-transition.component';
import { Injectable } from '@angular/core';

// Exported classes and enums used by the service
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
  public rotation = 0;
}

// Service code
@Injectable()
export class FsmDataService {
  // public member variables
  public fsmStates: FsmState[] = [];
  public fsmTransitions: FsmTransition[] = [];
  public defaultStateLabel = 'q';

  constructor() {
  }

  // public static methods for states
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

  // public methods for states
  public addState = (state: FsmState): FsmState => {
    this.fsmStates.push(state);
    return state;
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

  public validateLabel(state: FsmState): string {
    if (state.name.length === 0 || state.name.length > 3) { return 'Not a valid label name'; }
    if (state.name.startsWith(this.defaultStateLabel) && state.name !== this.defaultStateLabel + state.stateIndex) {
      return 'Names beginning with ' + this.defaultStateLabel + ' are reserved';
    }
    for (const item of this.fsmStates) {
      if (item !== state && item.name === state.name) { return 'Duplicate state name'; }
    }
    return '';
  }

  public removeState(state: FsmState) {
    this.removeTransitionsForState(state);
    const index = this.fsmStates.indexOf(state);
    if (index > -1) {
      this.fsmStates.splice(index, 1);
    }
  }

  // public methods for transitions
  public validateAcceptChars(transition: FsmTransition) {
    if (transition.charactersAccepted.length === 0) { return 'Invalid accept set'; }
    // .|.-.(,[.|.-.])* need to make sure . can match all special chars or it will need to be classed.

    // check to make sure it is a , delimited list of single characters (escapes ok) or ranges like a-z,A-Z,0-9,b,c,\r,\n
    // with escapes make sure they are legal, with ranges make sure ascii value of first is less than second and include all
    // chars between ascii values
    const result = /^(([\s\S]|[\s\S]-[\s\S])(\,([\s\S]|[\s\S]-[\s\S]))*)$/g.test(transition.charactersAccepted);
    return (result ? '' : 'Invalid accept set');
  }

  public addTransition = (source: FsmState, dest: FsmState): FsmTransition => {
    let trans = { sourceState: source, destState: dest, charactersAccepted: 'a', type: 'transition', rotation: 0 };
    const problems = this.fsmTransitions.filter((item) =>
      (source === dest && item.sourceState === item.destState && item.sourceState === source) ||
      (source !== dest && item.sourceState === source && item.destState === dest)
    );
    if (problems.length === 0) {
      this.fsmTransitions.push(trans);
    } else {
      trans = problems[0];
    }
    return trans;
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

  // public methods for FSM
  public clear = () => {
    this.fsmStates = [];
    this.fsmTransitions = [];
  }

  public toJson() {
    return JSON.stringify(this.fsmTransitions);
  }
  public fromJson(data: string) {
    this.fsmStates = [];
    this.fsmTransitions = [];
    this.fsmTransitions = JSON.parse(data);
    for (const trans of this.fsmTransitions) {
      if (!trans.rotation) { trans.rotation = 0; }
      let state = this.fsmStates.find(item => item.name === trans.sourceState.name);
      if (!state) {
        this.fsmStates.push(trans.sourceState);
      } else {
        trans.sourceState = state;
      }
      state = this.fsmStates.find(item => item.name === trans.destState.name);
      if (!state) {
        this.fsmStates.push(trans.destState);
      } else {
        trans.destState = state;
      }
    }
  }
}
