export class FsmObject {
    type: string;
}

export class FsmState extends FsmObject {

}
export class FsmTransition extends FsmObject {

}

export class Fsm {
    states: FsmState[] = [];
    transitions: FsmTransition[] = [];
}
