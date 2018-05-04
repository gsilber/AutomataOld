import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsmDrawComponent } from './fsm-draw/fsm-draw.component';
import { FsmDrawControlbarComponent } from './fsm-draw-controlbar/fsm-draw-controlbar.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [FsmDrawComponent, FsmDrawControlbarComponent],
  exports: [FsmDrawComponent]
})
export class FsmDrawModule { }
