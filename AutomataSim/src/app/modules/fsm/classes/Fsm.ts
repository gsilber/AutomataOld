import { FsmState } from './FsmState';
import { FsmTransition } from './FsmTransition';

export class Fsm {
    private states: FsmState[] = [];
    private transitions: FsmTransition[] = [];
    public identifier: string;
    constructor(id = 'default') {
        this.identifier = id;
    }
}
