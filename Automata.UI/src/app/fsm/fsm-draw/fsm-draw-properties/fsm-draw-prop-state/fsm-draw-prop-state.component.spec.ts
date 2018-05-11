import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmDrawPropStateComponent } from './fsm-draw-prop-state.component';

describe('FsmDrawPropStateComponent', () => {
  let component: FsmDrawPropStateComponent;
  let fixture: ComponentFixture<FsmDrawPropStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmDrawPropStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmDrawPropStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
