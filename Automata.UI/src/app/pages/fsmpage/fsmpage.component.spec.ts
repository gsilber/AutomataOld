import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmpageComponent } from './fsmpage.component';

describe('FsmpageComponent', () => {
  let component: FsmpageComponent;
  let fixture: ComponentFixture<FsmpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
