import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmPageComponent } from './fsm-page.component';

describe('FsmPageComponent', () => {
  let component: FsmPageComponent;
  let fixture: ComponentFixture<FsmPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
