import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmSimComponent } from './fsm-sim.component';

describe('FsmSimComponent', () => {
  let component: FsmSimComponent;
  let fixture: ComponentFixture<FsmSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
