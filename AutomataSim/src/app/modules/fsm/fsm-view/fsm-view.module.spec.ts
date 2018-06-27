import { FsmViewModule } from './fsm-view.module';

describe('FsmViewModule', () => {
  let fsmViewModule: FsmViewModule;

  beforeEach(() => {
    fsmViewModule = new FsmViewModule();
  });

  it('should create an instance', () => {
    expect(fsmViewModule).toBeTruthy();
  });
});
