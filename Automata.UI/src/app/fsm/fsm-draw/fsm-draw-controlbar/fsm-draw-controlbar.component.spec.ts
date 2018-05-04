import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmDrawControlbarComponent } from './fsm-draw-controlbar.component';

describe('FsmDrawControlbarComponent', () => {
  let component: FsmDrawControlbarComponent;
  let fixture: ComponentFixture<FsmDrawControlbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmDrawControlbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmDrawControlbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
