import { TestBed, inject } from '@angular/core/testing';

import { FsmService } from './fsm.service';

describe('FsmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FsmService]
    });
  });

  it('should be created', inject([FsmService], (service: FsmService) => {
    expect(service).toBeTruthy();
  }));
});
