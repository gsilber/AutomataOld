export class FsmObject {
    type: string;
}

// States
export class FsmStateData {

}
export class FsmState extends FsmObject {
    private _data: FsmStateData;
}

// Transitions
export class FsmTransitionData {

}
export class FsmTransition extends FsmObject {
    private _data: FsmTransitionData;
}

export class Fsm {
    states: FsmState[] = [];
    transitions: FsmTransition[] = [];
}
