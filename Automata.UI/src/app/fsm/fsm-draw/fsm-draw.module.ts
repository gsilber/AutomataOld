import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsmDrawComponent } from './components/fsm-draw/fsm-draw.component';
import { FsmDrawControlbarComponent } from './components/fsm-draw-controlbar/fsm-draw-controlbar.component';
import { FsmDrawStateComponent } from './components/fsm-draw-state/fsm-draw-state.component';
import { FsmDrawTransitionComponent } from './components/fsm-draw-transition/fsm-draw-transition.component';
import { FsmDrawSurfaceComponent } from './components/fsm-draw-surface/fsm-draw-surface.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [FsmDrawComponent],
  declarations: [FsmDrawComponent, FsmDrawControlbarComponent, FsmDrawStateComponent, FsmDrawTransitionComponent, FsmDrawSurfaceComponent]
})
export class FsmDrawModule { }
