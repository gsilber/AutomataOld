import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmViewComponent } from './fsm-view.component';

describe('FsmViewComponent', () => {
  let component: FsmViewComponent;
  let fixture: ComponentFixture<FsmViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
