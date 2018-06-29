import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmViewStateComponent } from './fsm-view-state.component';

describe('FsmViewStateComponent', () => {
  let component: FsmViewStateComponent;
  let fixture: ComponentFixture<FsmViewStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmViewStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmViewStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
