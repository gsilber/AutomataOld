export class FsmState {
    public label: string;
    public uiData: { x: number, y: number };
    public startState: boolean;
    public finalState: boolean;
}

export class FsmStateFactory {
    static create(label: string, x: number, y: number): FsmState {
        return { label: label, uiData: { x, y } } as FsmState;
    }
    static fromJSON(json: string): FsmState {
        return JSON.parse(json) as FsmState;
    }
    static toJSON(state: FsmState): string {
        return JSON.stringify(state);
    }
}
