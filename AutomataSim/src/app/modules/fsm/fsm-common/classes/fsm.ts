import { FsmState } from './FsmState';

export class Fsm {
    private _id: string;
    private _states: FsmState[] = [];
    constructor(id: string) {
        this._id = id;
    }

    public addState(state: FsmState): FsmState {
        this._states.push(state);
        return state;
    }
    public removeState(state: FsmState): FsmState {
        this._states = this._states.filter(trial => trial !== state);
        return state;
    }
    public getStates(): FsmState[] {
        return this._states;
    }
    public clear() {
        this._states = [];
    }
}
