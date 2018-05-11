import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmDrawPropTransitionComponent } from './fsm-draw-prop-transition.component';

describe('FsmDrawPropTransitionComponent', () => {
  let component: FsmDrawPropTransitionComponent;
  let fixture: ComponentFixture<FsmDrawPropTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmDrawPropTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmDrawPropTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
