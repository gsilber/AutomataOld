import { FsmTransition, FsmTransitionData } from './fsm-transition';
import { FsmState, StateTypes, FsmStateData } from './fsm-state';

export class Fsm {
    fsmStates: FsmState[] = [];
    fsmTransitions: FsmTransition[] = [];

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
            this.fsmTransitions.filter((item) => item.sourceState === state).forEach((transition) => {
                map = map.concat(transition.characterMap);
            });
            if (!map.every((elem, i, array) => array.lastIndexOf(elem) === i)) { deter = false; }
        });
        return deter;
    }

    get alphabet(): any {
        const sigma = {};
        this.fsmStates.forEach((state) => {
            state.outboundTransitions.forEach((transition) => {
                transition.characterMap.forEach(item => { if (!(item in sigma)) { sigma[item] = true; } });
            });
        });
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
    }

    public stateLabelError(state: FsmState): string {
        const err = state.labelError;
        if (err.length > 0) { return err; }
        for (const item of this.fsmStates) {
            if (item !== state && item.name === state.name) { return 'Duplicate state name'; }
        }
        return err;
    }

    // public methods for transitions
    public addTransition(source: FsmState, dest: FsmState, transCharacter): FsmTransition {
        let trans = new FsmTransition({ sourceState: source, destState: dest, charactersAccepted: '', rotation: 0 });
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
        return trans;
    }

    public removeTransition(transition: FsmTransition) {
        const index = this.fsmTransitions.indexOf(transition);
        if (index > -1) {
            this.fsmTransitions.splice(index, 1);
        }
    }
    // global methods
    public clear = () => {
        this.fsmStates = [];
        this.fsmTransitions = [];
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
            if (!dst) { dst = new FsmState(transbase.destState); this.fsmStates.push(dst); }
            transbase.destState = dst;
            if (!transbase.rotation) { transbase.rotation = 0; }
            this.fsmTransitions.push(new FsmTransition(transbase));
        });
    }
}

