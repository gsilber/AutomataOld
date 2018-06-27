import { FsmDrawModule } from './fsm-draw.module';

describe('FsmDrawModule', () => {
  let fsmDrawModule: FsmDrawModule;

  beforeEach(() => {
    fsmDrawModule = new FsmDrawModule();
  });

  it('should create an instance', () => {
    expect(fsmDrawModule).toBeTruthy();
  });
});
