import { TestBed, inject } from '@angular/core/testing';

import { FsmDataService } from './fsm-data.service';

describe('FsmDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FsmDataService]
    });
  });

  it('should be created', inject([FsmDataService], (service: FsmDataService) => {
    expect(service).toBeTruthy();
  }));
});
