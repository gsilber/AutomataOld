import { FsmTransition, FsmTransitionData } from './fsm-transition';
import { FsmState, StateTypes, FsmStateData } from './fsm-state';

export class Fsm {

    fsmStates: FsmState[] = [];
    fsmTransitions: FsmTransition[] = [];
    _dirty = false;

    get dirty(): boolean {
        let dirty = false;
        this.fsmStates.forEach(state => { if (state.dirty) { dirty = true; } });
        this.fsmTransitions.forEach(trans => { if (trans.dirty) { dirty = true; } });
        return dirty || this._dirty;
    }
    get empty(): boolean { return this.fsmStates.length === 0; }
    get valid(): boolean {
        // does it at least one start and one final state.  Everything else is handled by individual inserts
        if (this.fsmTransitions.length === 0 ||
            this.fsmStates.filter(item => item.startState).length === 0 ||
            this.fsmStates.filter(item => item.finalState).length === 0) {
            return false;
        }
        return true;
    }

    get deterministic(): boolean {
        let deter = true;
        this.fsmStates.forEach((state) => {
            let map = [];
            state.outboundTransitions.forEach((transition) => {
                if (transition.epsilon) {
                    deter = false;
                } else {
                    map = map.concat(transition.characterMap);
                }
            });
            if (!map.every((elem, i, array) => array.lastIndexOf(elem) === i)) { deter = false; }
        });
        return deter;
    }

    get complete(): boolean {
        const sigma = this.alphabet;
        return this.fsmStates.filter(state => state.charactersClosure.length !== sigma.length).length === 0;
    }
    get alphabet(): any {
        const sigma = {};
        this.fsmStates.forEach((state) => state.charactersClosure.forEach(item => sigma[item] = true));
        return Object.keys(sigma);
    }

    get maxPos() {
        let maxX = 0;
        let maxY = 0;
        this.fsmStates.forEach(state => {
            if (state.x > maxX) { maxX = state.x; }
            if (state.y > maxY) { maxY = state.y; }
        });
        return { x: maxX, y: maxY };
    }

    // public methods for states
    public addState = (stateData: FsmStateData): FsmState => {
        const state: FsmState = new FsmState(stateData);
        this.fsmStates.push(state);
        return state;
    }

    public removeState(state: FsmState) {
        this.fsmTransitions = this.fsmTransitions.filter(
            function (item) { return item.sourceState !== state && item.destState !== state; });
        const index = this.fsmStates.indexOf(state);
        if (index > -1) {
            this.fsmStates.splice(index, 1);
        }
        this._dirty = true;
    }

    // has to be at this level, since we need to see all the states to check for uniqueness
    public stateLabelError(state: FsmState): string {
        const err = state.labelError;
        if (err.length > 0) { return err; }
        for (const item of this.fsmStates) {
            if (item !== state && item.name === state.name) { return 'Duplicate state name'; }
        }
        return err;
    }

    // public methods for transitions
    public addTransition(source: FsmState, dest: FsmState, transCharacter: string = 'a'): FsmTransition {
        let trans = new FsmTransition({ sourceState: source, destState: dest, charactersAccepted: '', rotation: 0, epsilon: false });
        trans.charactersAccepted = transCharacter;
        const problems = this.fsmTransitions.filter((item) =>
            (source === dest && item.sourceState === item.destState && item.sourceState === source) ||
            (source !== dest && item.sourceState === source && item.destState === dest)
        );
        if (problems.length === 0) {
            this.fsmTransitions.push(trans);
        } else {
            trans = problems[0];
        }
        source.outboundTransitions.push(trans);
        return trans;
    }

    public removeTransition(transition: FsmTransition) {
        let index = transition.sourceState.outboundTransitions.indexOf(transition);
        if (index > -1) { transition.sourceState.outboundTransitions.splice(index, 1); }
        index = this.fsmTransitions.indexOf(transition);
        if (index > -1) { this.fsmTransitions.splice(index, 1); }
        this._dirty = true;
    }
    // global methods
    public setClean = () => {
        this._dirty = false;
        this.fsmStates.forEach(state => state.dirty = false);
        this.fsmTransitions.forEach(trans => trans.dirty = false);
    }
    public clear = () => {
        this.fsmStates = [];
        this.fsmTransitions = [];
        this._dirty = false;
    }

    public asSerializableObject() {
        const simpleObj = [];
        this.fsmTransitions.forEach(transition => simpleObj.push(transition.asSerializableObject()));
        return simpleObj;
    }

    public fromSerializableObject(object: any[]) {
        this.clear();
        object.forEach(transbase => {
            // see if states exists. if not crate them
            let src = this.fsmStates.find(item => item.name === transbase.sourceState.name);
            let dst = this.fsmStates.find(item => item.name === transbase.destState.name);
            if (!src) { src = new FsmState(transbase.sourceState); this.fsmStates.push(src); }
            transbase.sourceState = src;
            if (src.name === transbase.destState.name) {
                dst = src;
            } else {
                if (!dst) { dst = new FsmState(transbase.destState); this.fsmStates.push(dst); }
            }
            transbase.destState = dst;
            if (!transbase.rotation) { transbase.rotation = 0; }
            this.fsmTransitions.push(new FsmTransition(transbase));
        });
        this.setClean();
    }
    constructor() {
        // this.fromSerializableObject(JSON.parse(
        //     '[{"sourceState":{"x":315.6953125,"y":282.04296875,"stateIndex":0,"name":"q0","stateType":"startfinal"},' +
        //     '"destState":{"x":315.6953125,"y":282.04296875,"stateIndex":0,"name":"q0","stateType":"startfinal"}' +
        //     ',"charactersAccepted":"a","characterMap":["a"],"rotation":0}]'
        // ));
    }
}

