import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmExamplesComponent } from './fsm-examples.component';

describe('FsmExamplesComponent', () => {
  let component: FsmExamplesComponent;
  let fixture: ComponentFixture<FsmExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
