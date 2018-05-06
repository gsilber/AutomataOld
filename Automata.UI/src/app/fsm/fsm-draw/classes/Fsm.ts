export class FsmObject {
    type: string;
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
    set position(val) { this._data.x = val.x; this._data.y = val.y; }
    get label() { return this._data.label; }
    set label(val) { this._data.label = val; }
    get start() { return this._data.start; }
    set start(val) { this._data.start = val; }
    get final() { return this._data.final; }
    set final(val) { this._data.final = val; }

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

export class Fsm {
    states: FsmState[] = []; // [new FsmState({ x: 50, y: 50, label: 'q0', start: false, final: false })];
    transitions: FsmTransition[] = [];

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
        const newState=new FsmState({ x: x, y: y, label: 'q' + i, start: false, final: false });
        this.states.push(newState);
        return newState;
    }
}
