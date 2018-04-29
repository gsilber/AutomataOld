import { FsmState } from './fsm-state';
import { FsmObject } from './fsm-object';

export class FsmTransition extends FsmObject {
    public sourceState: FsmState;
    public destState: FsmState;
    // this can be a comma seperated list of characters or a RegEx character classes (i.e. a,b or [a..z] or [abc])
    public charactersAccepted = '';
    public characterMap?: string[] = [];
    public rotation = 0;
  }
  