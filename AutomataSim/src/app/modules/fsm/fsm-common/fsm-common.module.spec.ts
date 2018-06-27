import { FsmCommonModule } from './fsm-common.module';

describe('FsmCommonModule', () => {
  let fsmCommonModule: FsmCommonModule;

  beforeEach(() => {
    fsmCommonModule = new FsmCommonModule();
  });

  it('should create an instance', () => {
    expect(fsmCommonModule).toBeTruthy();
  });
});
