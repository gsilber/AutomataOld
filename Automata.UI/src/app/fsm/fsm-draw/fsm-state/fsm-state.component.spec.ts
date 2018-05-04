import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmStateComponent } from './fsm-state.component';

describe('FsmStateComponent', () => {
  let component: FsmStateComponent;
  let fixture: ComponentFixture<FsmStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
