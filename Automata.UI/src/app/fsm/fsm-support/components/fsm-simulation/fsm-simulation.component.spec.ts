import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmSimulationComponent } from './fsm-simulation.component';

describe('FsmSimulationComponent', () => {
  let component: FsmSimulationComponent;
  let fixture: ComponentFixture<FsmSimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmSimulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
