import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmInfoComponent } from './fsm-info.component';

describe('FsmInfoComponent', () => {
  let component: FsmInfoComponent;
  let fixture: ComponentFixture<FsmInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
