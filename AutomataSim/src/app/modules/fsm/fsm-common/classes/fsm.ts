import { FsmState } from './FsmState';

export class Fsm {
    private _id: string;
    private _states: FsmState[] = [];
    private _stateMap: Map<string, FsmState> = new Map<string, FsmState>();
    constructor(id: string) {
        this._id = id;
    }

    public addState(state: FsmState): FsmState {
        this._states.push(state);
        this._stateMap.set(state.label, state);
        return state;
    }
    public removeState(state: FsmState): FsmState {
        this._states = this._states.filter(trial => trial !== state);
        this._stateMap.delete(state.label);
        return state;
    }
    public getStates(): FsmState[] {
        return this._states;
    }
    public clear() {
        this._states = [];
        this._stateMap = new Map<string, FsmState>();
    }
}
