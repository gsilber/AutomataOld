import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmTransitionComponent } from './fsm-transition.component';

describe('FsmTransitionComponent', () => {
  let component: FsmTransitionComponent;
  let fixture: ComponentFixture<FsmTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
