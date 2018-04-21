import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmDrawPropsComponent } from './fsm-draw-props.component';

describe('FsmDrawPropsComponent', () => {
  let component: FsmDrawPropsComponent;
  let fixture: ComponentFixture<FsmDrawPropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmDrawPropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmDrawPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
