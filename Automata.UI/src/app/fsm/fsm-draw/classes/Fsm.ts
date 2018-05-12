import { Injectable } from "@angular/core";

export class FsmObject {
    type: string;
    public dirty = true;
}

// States
export class FsmStateData {
    x: number;
    y: number;
    label: string;
    start = false;
    final = false;
}

export class FsmState extends FsmObject {
    private _data: FsmStateData;
    get position() { return { x: this._data.x, y: this._data.y }; }
    get label() { return this._data.label; }
    get start() { return this._data.start; }
    get final() { return this._data.final; }
    set position(val) {
        if (this._data.x !== val.x || this._data.y !== val.y) { this.dirty = true; }
        this._data.x = val.x;
        this._data.y = val.y;
    }
    set label(val) {
        if (this._data.label !== val) { this.dirty = true; }
        this._data.label = val;
    }
    set start(val) {
        if (this._data.start !== val) { this.dirty = true; }
        this._data.start = val;
    }
    set final(val) {
        if (this._data.final !== val) { this.dirty = true; }
        this._data.final = val;
    }

    constructor(stateData: FsmStateData) {
        super();
        this._data = stateData;
        this.type = 'state';
    }

    toSerializableObject(): FsmStateData {
        return this._data;
    }

}

// Transitions
export class FsmTransitionData {

}
export class FsmTransition extends FsmObject {
    private _data: FsmTransitionData;
}

@Injectable()
export class Fsm {
    states: FsmState[] = []; // [new FsmState({ x: 50, y: 50, label: 'q0', start: false, final: false })];
    transitions: FsmTransition[] = [];
    private _dirty = false;

    get dirty(): boolean {
        let isdirty = this._dirty;
        this.states.forEach(state => isdirty = isdirty || state.dirty);
        this.transitions.forEach(trans => isdirty = isdirty || trans.dirty);
        return isdirty;
    }
    set dirty(val: boolean) {
        this.states.forEach(state => state.dirty = val);
        this.transitions.forEach(trans => trans.dirty = val);
        this._dirty = val;
    }

    serialize(): string {
        const states = this.states.map(item => item.toSerializableObject());
        return JSON.stringify({ states: states, transitions: [] });
    }
    deserialize(data: string) {
        const states = JSON.parse(data);
        this.states = states.map(item => new FsmState(item));
    }
    addNewState(x: number, y: number) {
        // find first available state name starting with a q
        const stateMap = {};
        this.states.forEach(state => stateMap[state.label] = true);
        let i = 0;
        while (stateMap['q' + i]) { i++; }
        const newState = new FsmState({ x: x, y: y, label: 'q' + i, start: false, final: false });
        this.states.push(newState);
        this._dirty = true;
        return newState;
    }
    deleteState(state: FsmState): FsmState {
        const position = this.states.indexOf(state);
        if (position > -1) {
            this.states.splice(position, 1);
        }
        return state;
    }
}
