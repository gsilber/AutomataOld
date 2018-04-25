import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule
  ],
  declarations: [AlertModalComponent],
  exports: [AlertModalComponent]
})
export class AlertModalModule { }
