import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuringPageComponent } from './turing-page.component';

describe('TuringPageComponent', () => {
  let component: TuringPageComponent;
  let fixture: ComponentFixture<TuringPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuringPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
