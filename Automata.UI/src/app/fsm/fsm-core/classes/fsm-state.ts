import { FsmObject } from './fsm-object';

export enum StateTypes { START = 'start', FINAL = 'final', NORMAL = 'normal', STARTFINAL = 'startfinal' }

export class FsmState extends FsmObject {
    public x: number;
    public y: number;
    public stateIndex: number;
    public name: string;
    public stateType: StateTypes = StateTypes.NORMAL;
  }
  