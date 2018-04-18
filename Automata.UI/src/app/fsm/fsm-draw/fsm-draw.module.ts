import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsmDrawComponent } from './components/fsm-draw/fsm-draw.component';
import { FsmDrawControlbarComponent } from './components/fsm-draw-controlbar/fsm-draw-controlbar.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [FsmDrawComponent],
  declarations: [FsmDrawComponent, FsmDrawControlbarComponent]
})
export class FsmDrawModule { }
