import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsmDrawComponent } from './fsm-draw/fsm-draw.component';
import { FsmDrawControlbarComponent } from './fsm-draw-controlbar/fsm-draw-controlbar.component';
import { FsmDrawSurfaceComponent } from './fsm-draw-surface/fsm-draw-surface.component';
import { FsmDrawPropertiesComponent } from './fsm-draw-properties/fsm-draw-properties.component';
import { FsmStateComponent } from './fsm-state/fsm-state.component';
import { FsmTransitionComponent } from './fsm-transition/fsm-transition.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [FsmDrawComponent, FsmDrawControlbarComponent, FsmDrawSurfaceComponent, FsmDrawPropertiesComponent, FsmStateComponent, FsmTransitionComponent],
  exports: [FsmDrawComponent]
})
export class FsmDrawModule { }
