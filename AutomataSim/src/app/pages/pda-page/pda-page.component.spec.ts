import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdaPageComponent } from './pda-page.component';

describe('PdaPageComponent', () => {
  let component: PdaPageComponent;
  let fixture: ComponentFixture<PdaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
