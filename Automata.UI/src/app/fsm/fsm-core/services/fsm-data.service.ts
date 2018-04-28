import { FsmDrawTransitionComponent } from './../../fsm-draw/components/fsm-draw-transition/fsm-draw-transition.component';
import { Injectable, ModuleWithComponentFactories } from '@angular/core';

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
  public characterMap?: string[] = [];
  public rotation = 0;
}

// Service code
@Injectable()
export class FsmDataService {
  // public member variables
  private _fsmStates: FsmState[] = [];
  private _fsmTransitions: FsmTransition[] = [];
  private _dfsmStates: FsmState[] = [];
  private _dfsmTransitions: FsmTransition[] = [];
  public defaultStateLabel = 'q';

  public get machineValid() {
    // does it at least one start and one final state.  Everything else is handled by individual inserts
    if (this._fsmStates.filter(item => item.stateType === StateTypes.START || item.stateType === StateTypes.STARTFINAL).length === 0) {
      return false;
    }
    if (this._fsmStates.filter(item => item.stateType === StateTypes.FINAL || item.stateType === StateTypes.STARTFINAL).length === 0) {
      return false;
    }
    if (this._fsmTransitions.length === 0) { return false; }
    return true;
  }

  public get isDeterministic(): boolean {
    let deter = true;
    this._fsmStates.forEach((state) => {
      let map = [];
      const transitions = this.getStateOutboundTransitions(state);
      transitions.forEach((transition) => {
        map = map.concat(transition.characterMap);
      });
      if (!map.every((elem, i, array) => array.lastIndexOf(elem) === i)) { deter = false; }
    });
    return deter;
  }

  public get alphabet(): any {
    const sigma = {};
    this._fsmStates.forEach((state) => {
      const transitions = this.getStateOutboundTransitions(state);
      transitions.forEach((transition) => {
        transition.characterMap.forEach(item => { if (!(item in sigma)) { sigma[item] = true; } });
      });
    });
    return sigma;
  }
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
  public getStates(deterministic = false) {
    if (!deterministic) { return this._fsmStates; }
    if (this.isDeterministic) { return this._fsmStates; }
    // here a deterministic version of a non-deterministic FSA has been requested.  We need to generate an DFSM with
    // subset method
  }
  public maxPos = () => {
    let maxX = 0;
    let maxY = 0;
    this._fsmStates.forEach(state => {
      if (state.x > maxX) { maxX = state.x; }
      if (state.y > maxY) { maxY = state.y; }
    });
    return { x: maxX, y: maxY };
  }
  public addState = (state: FsmState): FsmState => {
    this._fsmStates.push(state);
    return state;
  }

  public addDefaultState = (x: number, y: number): FsmState => {
    let count = 0;
    const objCheck = {};
    for (const state of this._fsmStates) {
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
    for (const item of this._fsmStates) {
      if (item !== state && item.name === state.name) { return 'Duplicate state name'; }
    }
    return '';
  }

  public getStateOutboundTransitions(state: FsmState) {
    return this._fsmTransitions.filter((item) => item.sourceState === state);
  }

  public removeState(state: FsmState) {
    this._fsmTransitions = this._fsmTransitions.filter(
      function (item) { return item.sourceState !== state && item.destState !== state; });
    const index = this._fsmStates.indexOf(state);
    if (index > -1) {
      this._fsmStates.splice(index, 1);
    }
  }

  // public methods for transitions
  public getTransitions(deterministic = false) {
    return this._fsmTransitions;
  }
  public setTransitionChars(transition: FsmTransition, chars: string) {
    transition.charactersAccepted = chars;
    this.calculateDeterministicFSM();
    this.validateAcceptChars(transition);
  }

  public getTransitionChars(transition: FsmTransition) {
    return transition.charactersAccepted;
  }
  public validateAcceptChars(transition: FsmTransition) {
    if (this.getTransitionChars(transition).length === 0) { return 'Invalid accept set'; }
    const result = /^(([\s\S]|[\s\S]-[\s\S])(\,([\s\S]|[\s\S]-[\s\S]))*)$/g.test(this.getTransitionChars(transition));
    if (!result) { return 'Invalid accept set'; }
    // Here we need to check for duplicate values in the accept string and build character map.
    const sChars = this.getTransitionChars(transition);
    const aChars = sChars.split(',');
    const map = [];
    let flag = false;
    aChars.forEach(charClass => {
      if (charClass.length === 1) {
        map.push(charClass);
      }
      if (charClass.length > 1) {
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
    transition.characterMap = map;
    return '';
  }

  public addTransition = (source: FsmState, dest: FsmState): FsmTransition => {
    let trans = { sourceState: source, destState: dest, charactersAccepted: '', type: 'transition', rotation: 0 };
    this.setTransitionChars(trans, 'a');
    const problems = this._fsmTransitions.filter((item) =>
      (source === dest && item.sourceState === item.destState && item.sourceState === source) ||
      (source !== dest && item.sourceState === source && item.destState === dest)
    );
    if (problems.length === 0) {
      this._fsmTransitions.push(trans);
    } else {
      trans = problems[0];
    }
    this.calculateDeterministicFSM();
    return trans;
  }

  public removeTransition(transition: FsmTransition) {
    const index = this._fsmTransitions.indexOf(transition);
    if (index > -1) {
      this._fsmTransitions.splice(index, 1);
    }
    this.calculateDeterministicFSM();
  }

  // helper methods
  calculateDeterministicFSM() {
    this._dfsmStates = [];
    this._dfsmTransitions = [];
    if (this.isDeterministic) {
      this._dfsmStates = this._fsmStates;
      this._dfsmTransitions = this._fsmTransitions;
    } else {
      const sigma = this.alphabet;
      const startStates =
        this._fsmStates.filter(state => state.stateType === StateTypes.START || state.stateType === StateTypes.STARTFINAL);
      const finalStates =
        this._fsmStates.filter(state => state.stateType === StateTypes.FINAL || state.stateType === StateTypes.STARTFINAL);
      // combine start states into a state
      let stateList = [];
      stateList.push({ states: startStates, processed: false, transitions: [] });
      while (stateList.filter(state => !state.processed).length > 0) {
        const workingState = stateList.filter(state => !state.processed)[0];
        stateList = this.processTransitionState(workingState, stateList, sigma);
      }
      // here statelist contains a set of our state objects and transitions, we can build a new FSM from this data.
    }
  }

  processTransitionState(state, stateList, sigma) {
    const ourTranactions = this._fsmTransitions.filter(transition => state.states.indexOf(transition.sourceState) !== -1);
    sigma.forEach(letter => {
      const letterTrans = ourTranactions.filter(transaction => transaction.characterMap.indexOf(letter) !== -1);
      const newState = letterTrans.map(trans => trans.destState);
      if (stateList.filter(item => item.states === newState).length === 0) {
        stateList.push({ states: newState, processed: false, transitions: [] });
      }
      state.transitions.push({letter: letter, destination: newState});
    });
    state.processed = true;
    return stateList;
  }

  // public methods for FSM
  public clear = () => {
    this._dfsmStates = [];
    this._dfsmTransitions = [];
    this._fsmStates = [];
    this._fsmTransitions = [];
  }

  public toJson() {
    return JSON.stringify(this._fsmTransitions);
  }

  public fromJson(data: string) {
    this._fsmStates = [];
    this._fsmTransitions = [];
    this._fsmTransitions = JSON.parse(data);
    for (const trans of this._fsmTransitions) {
      if (!trans.rotation) { trans.rotation = 0; }
      let state = this._fsmStates.find(item => item.name === trans.sourceState.name);
      if (!state) {
        this._fsmStates.push(trans.sourceState);
      } else {
        trans.sourceState = state;
      }
      state = this._fsmStates.find(item => item.name === trans.destState.name);
      if (!state) {
        this._fsmStates.push(trans.destState);
      } else {
        trans.destState = state;
      }
    }
    this.calculateDeterministicFSM();
  }
}
