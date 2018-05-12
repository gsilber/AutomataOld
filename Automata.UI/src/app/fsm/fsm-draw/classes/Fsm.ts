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
        this.fromSerializableObject(stateData);
    }

    toSerializableObject(): FsmStateData {
        return this._data;
    }
    fromSerializableObject(obj: FsmStateData) {
        this._data = obj;
        this.type = 'state';
    }
}

// Transitions
export class FsmTransitionData {
    charactersAccepted = 'a';
    rotation = 0.0;
    startState = '';
    endState = '';
}
export class FsmTransition extends FsmObject {
    private _data: FsmTransitionData;
    private _startState: FsmState = null;
    private _endState: FsmState = null;
    get startState(): FsmState { return this._startState; }
    get endState(): FsmState { return this._endState; }
    get charactersAccepted(): string { return this._data.charactersAccepted; }
    get rotation(): number { return this._data.rotation; }
    set startState(val: FsmState) {
        this._startState = val;
        this._data.startState = (val ? val.label : '');
    }
    set endState(val: FsmState) {
        this._endState = val;
        this._data.endState = (val ? val.label : '');
    }
    set charactersAccepted(val) {
        if (this._data.charactersAccepted !== val) { this.dirty = true; }
        this._data.charactersAccepted = val;
    }
    set rotation(val) {
        if (this._data.rotation !== val) { this.dirty = true; }
        this._data.rotation = val;
    }

    constructor(transData: FsmTransitionData, startState: FsmState, endState: FsmState) {
        super();
        this.fromSerializableObject(transData, startState, endState);
    }

    toSerializableObject(): FsmTransitionData {
        return this._data;
    }
    fromSerializableObject(obj: FsmTransitionData, startState: FsmState, endState: FsmState) {
        this._data = obj;
        this.type = 'transition';
        this.startState = startState;
        this.endState = endState;
    }
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
        const transitions = this.transitions.map(item => item.toSerializableObject());
        return JSON.stringify({ states: states, transitions: transitions });
    }
    deserialize(data: string) {
        const object = JSON.parse(data);
        this.states = object.states.map(item => new FsmState(item));
        this.transitions = object.transitions.map(trans => {
            const start = this.states.find(state => state.label === trans.startState);
            const end = this.states.find(state => state.label === trans.endState);
            return new FsmTransition(trans, start, end);
        });

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
    addNewTransition(startState: FsmState, endState: FsmState, characters = 'a') {
        // make sure it is unique between states
        if (this.transitions.filter(trans => trans.startState === startState && trans.endState === endState).length > 0) {
            return null;
        }
        const newTrans = new FsmTransition(
            { charactersAccepted: characters, rotation: 0.0, startState: startState.label, endState: endState.label },
            startState, endState);
        this.transitions.push(newTrans);
        this._dirty = true;
        return newTrans;
    }
    deleteState(state: FsmState): FsmState {
        const position = this.states.indexOf(state);
        if (position > -1) {
            this.states.splice(position, 1);
            this.deleteTransitionsForState(state);
            this._dirty = true;
        }
        return state;
    }
    private deleteTransitionsForState(state: FsmState) {
        this.transitions = this.transitions.filter(trans => trans.startState !== state && trans.endState !== state);
    }

    deleteTransition(transition: FsmTransition) {
        const position = this.transitions.indexOf(transition);
        if (position > -1) {
            this.transitions.splice(position, 1);
            this._dirty = true;
        }
        return transition;
    }
}
