import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdapageComponent } from './pdapage.component';

describe('PdapageComponent', () => {
  let component: PdapageComponent;
  let fixture: ComponentFixture<PdapageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdapageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdapageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
