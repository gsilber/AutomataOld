import { FsmTransition } from './fsm-transition';
import { FsmState } from './fsm-state';

export class Fsm {
    fsmStates: FsmState[] = [];
    fsmTransitions: FsmTransition[] = [];
}