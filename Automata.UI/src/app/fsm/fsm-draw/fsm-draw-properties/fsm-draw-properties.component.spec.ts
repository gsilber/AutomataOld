import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmDrawPropertiesComponent } from './fsm-draw-properties.component';

describe('FsmDrawPropertiesComponent', () => {
  let component: FsmDrawPropertiesComponent;
  let fixture: ComponentFixture<FsmDrawPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmDrawPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmDrawPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
