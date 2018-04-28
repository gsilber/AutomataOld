import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuringpageComponent } from './turingpage.component';

describe('TuringpageComponent', () => {
  let component: TuringpageComponent;
  let fixture: ComponentFixture<TuringpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuringpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuringpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
