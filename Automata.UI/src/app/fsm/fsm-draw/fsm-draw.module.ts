import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsmDrawComponent } from './components/fsm-draw/fsm-draw.component';
import { FsmDrawControlbarComponent } from './components/fsm-draw-controlbar/fsm-draw-controlbar.component';
import { FsmDrawStateComponent } from './components/fsm-draw-state/fsm-draw-state.component';
import { FsmDrawTransitionComponent } from './components/fsm-draw-transition/fsm-draw-transition.component';
import { SvgDirective } from './directives/svg.directive';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [FsmDrawComponent],
  declarations: [FsmDrawComponent, FsmDrawControlbarComponent, FsmDrawStateComponent, FsmDrawTransitionComponent, SvgDirective]
})
export class FsmDrawModule { }
