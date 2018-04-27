import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileIoComponent } from './file-io.component';

describe('FileIoComponent', () => {
  let component: FileIoComponent;
  let fixture: ComponentFixture<FileIoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileIoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
