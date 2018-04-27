import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileIoComponent } from './file-io/file-io.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [FileIoComponent],
  declarations: [FileIoComponent]
})
export class FileIoModule { }
