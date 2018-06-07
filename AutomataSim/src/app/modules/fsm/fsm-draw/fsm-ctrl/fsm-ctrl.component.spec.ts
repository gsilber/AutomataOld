import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmCtrlComponent } from './fsm-ctrl.component';

describe('FsmCtrlComponent', () => {
  let component: FsmCtrlComponent;
  let fixture: ComponentFixture<FsmCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
