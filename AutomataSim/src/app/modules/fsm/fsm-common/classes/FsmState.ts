import { FsmTransition } from './FsmTransition';

export class FsmState {
    public label: string;
    public uiData: { x: number, y: number };
    public startState: boolean;
    public finalState: boolean;
    public transitions: FsmTransition[] = [];
}

export class FsmStateFactory {
    static create(label: string, x: number, y: number): FsmState {
        return { label: label, uiData: { x, y } } as FsmState;
    }
}
