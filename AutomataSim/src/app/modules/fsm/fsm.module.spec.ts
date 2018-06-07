import { FsmModule } from './fsm.module';

describe('FsmModule', () => {
  let fsmModule: FsmModule;

  beforeEach(() => {
    fsmModule = new FsmModule();
  });

  it('should create an instance', () => {
    expect(fsmModule).toBeTruthy();
  });
});
