import { TestBed, inject } from '@angular/core/testing';

import { FsmFactoryService } from './fsm-factory.service';

describe('FsmFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FsmFactoryService]
    });
  });

  it('should be created', inject([FsmFactoryService], (service: FsmFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
