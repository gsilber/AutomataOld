import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmNondetermInfoComponent } from './fsm-nondeterm-info.component';

describe('FsmNondetermInfoComponent', () => {
  let component: FsmNondetermInfoComponent;
  let fixture: ComponentFixture<FsmNondetermInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmNondetermInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmNondetermInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
