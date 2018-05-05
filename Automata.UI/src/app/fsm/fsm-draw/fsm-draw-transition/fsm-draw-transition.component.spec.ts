import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmDrawTransitionComponent } from './fsm-draw-transition.component';

describe('FsmDrawTransitionComponent', () => {
  let component: FsmDrawTransitionComponent;
  let fixture: ComponentFixture<FsmDrawTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmDrawTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmDrawTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
