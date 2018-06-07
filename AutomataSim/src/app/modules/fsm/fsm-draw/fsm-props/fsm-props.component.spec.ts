import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmPropsComponent } from './fsm-props.component';

describe('FsmPropsComponent', () => {
  let component: FsmPropsComponent;
  let fixture: ComponentFixture<FsmPropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmPropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
