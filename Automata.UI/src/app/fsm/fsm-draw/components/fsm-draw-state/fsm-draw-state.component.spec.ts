import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmDrawStateComponent } from './fsm-draw-state.component';

describe('FsmDrawStateComponent', () => {
  let component: FsmDrawStateComponent;
  let fixture: ComponentFixture<FsmDrawStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmDrawStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmDrawStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
