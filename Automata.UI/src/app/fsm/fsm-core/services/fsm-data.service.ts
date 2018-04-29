import { FsmTransition } from './../classes/fsm-transition';
import { FsmState, StateTypes } from './../classes/fsm-state';

import { Injectable } from '@angular/core';
import { Fsm } from '../classes/fsm';

// Exported classes and enums used by the service


// Service code
@Injectable()
export class FsmDataService {
  // public member variables
  private _fsm: Fsm = new Fsm();
  public defaultStateLabel = 'q';

  public get machineValid() {
    // does it at least one start and one final state.  Everything else is handled by individual inserts
    if (this._fsm.fsmStates.filter(item => item.stateType === StateTypes.START || item.stateType === StateTypes.STARTFINAL).length === 0) {
      return false;
    }
    if (this._fsm.fsmStates.filter(item => item.stateType === StateTypes.FINAL || item.stateType === StateTypes.STARTFINAL).length === 0) {
      return false;
    }
    if (this._fsm.fsmTransitions.length === 0) { return false; }
    return true;
  }

  public get isDeterministic(): boolean {
    let deter = true;
    this._fsm.fsmStates.forEach((state) => {
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
    this._fsm.fsmStates.forEach((state) => {
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
    if (!deterministic) { return this._fsm.fsmStates; }
    if (this.isDeterministic) { return this._fsm.fsmStates; }
    // here a deterministic version of a non-deterministic FSA has been requested.  We need to generate an DFSM with
    // subset method
  }
  public maxPos = () => {
    let maxX = 0;
    let maxY = 0;
    this._fsm.fsmStates.forEach(state => {
      if (state.x > maxX) { maxX = state.x; }
      if (state.y > maxY) { maxY = state.y; }
    });
    return { x: maxX, y: maxY };
  }
  public addState = (state: FsmState): FsmState => {
    this._fsm.fsmStates.push(state);
    return state;
  }

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
    for (const item of this._fsm.fsmStates) {
      if (item !== state && item.name === state.name) { return 'Duplicate state name'; }
    }
    return '';
  }

  public getStateOutboundTransitions(state: FsmState) {
    return this._fsm.fsmTransitions.filter((item) => item.sourceState === state);
  }

  public removeState(state: FsmState) {
    this._fsm.fsmTransitions = this._fsm.fsmTransitions.filter(
      function (item) { return item.sourceState !== state && item.destState !== state; });
    const index = this._fsm.fsmStates.indexOf(state);
    if (index > -1) {
      this._fsm.fsmStates.splice(index, 1);
    }
  }

  // public methods for transitions
  public getTransitions() {
    return this._fsm.fsmTransitions;
  }
  public setTransitionChars(transition: FsmTransition, chars: string) {
    const oldchars = transition.charactersAccepted;
    transition.charactersAccepted = chars;
    if (this.validateAcceptChars(transition).length > 0) {
      transition.charactersAccepted = oldchars;
    }
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

  public addTransition = (source: FsmState, dest: FsmState, transCharacter = 'a'): FsmTransition => {
    let trans = { sourceState: source, destState: dest, charactersAccepted: '', type: 'transition', rotation: 0 };
    this.setTransitionChars(trans, transCharacter);
    const transList = this._fsm.fsmTransitions;
    const problems = transList.filter((item) =>
      (source === dest && item.sourceState === item.destState && item.sourceState === source) ||
      (source !== dest && item.sourceState === source && item.destState === dest)
    );
    if (problems.length === 0) {
        this._fsm.fsmTransitions.push(trans);
    } else {
      trans = problems[0];
    }
    return trans;
  }

  public removeTransition(transition: FsmTransition) {
    const index = this._fsm.fsmTransitions.indexOf(transition);
    if (index > -1) {
      this._fsm.fsmTransitions.splice(index, 1);
    }
  }

  // public methods for FSM
  public clear = () => {
    this._fsm.fsmStates = [];
    this._fsm.fsmTransitions = [];
  }

  public toJson() {
    return JSON.stringify(this._fsm.fsmTransitions);
  }

  public fromJson(data: string) {
    this._fsm.fsmStates = [];
    this._fsm.fsmTransitions = [];
    this._fsm.fsmTransitions = JSON.parse(data);
    for (const trans of this._fsm.fsmTransitions) {
      if (!trans.rotation) { trans.rotation = 0; }
      let state = this._fsm.fsmStates.find(item => item.name === trans.sourceState.name);
      if (!state) {
        this._fsm.fsmStates.push(trans.sourceState);
      } else {
        trans.sourceState = state;
      }
      state = this._fsm.fsmStates.find(item => item.name === trans.destState.name);
      if (!state) {
        this._fsm.fsmStates.push(trans.destState);
      } else {
        trans.destState = state;
      }
    }
  }
}
