export class FsmTransition {
    public srcStateLabel: string;
    public destStateLabel: string;
    private characters: string;
    private uiData: { rotation: number, offset: number };
}
