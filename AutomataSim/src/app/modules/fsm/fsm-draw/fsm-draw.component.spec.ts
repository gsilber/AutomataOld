import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmDrawComponent } from './fsm-draw.component';

describe('FsmDrawComponent', () => {
  let component: FsmDrawComponent;
  let fixture: ComponentFixture<FsmDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
