import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmNonDetermInfoComponent } from './fsm-non-determ-info.component';

describe('FsmNonDetermInfoComponent', () => {
  let component: FsmNonDetermInfoComponent;
  let fixture: ComponentFixture<FsmNonDetermInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmNonDetermInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmNonDetermInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
