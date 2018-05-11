import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsmDrawComponent } from './fsm-draw/fsm-draw.component';
import { FsmDrawControlbarComponent } from './fsm-draw-controlbar/fsm-draw-controlbar.component';
import { FsmDrawSurfaceComponent } from './fsm-draw-surface/fsm-draw-surface.component';
import { FsmDrawPropertiesComponent } from './fsm-draw-properties/fsm-draw-properties.component';
import { FsmDrawStateComponent } from './fsm-draw-state/fsm-draw-state.component';
import { FsmDrawTransitionComponent } from './fsm-draw-transition/fsm-draw-transition.component';
import { FormsModule } from '@angular/forms';
import { FsmDrawPropStateComponent } from './fsm-draw-properties/fsm-draw-prop-state/fsm-draw-prop-state.component';
import { FsmDrawPropTransitionComponent } from './fsm-draw-properties/fsm-draw-prop-transition/fsm-draw-prop-transition.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
    FsmDrawComponent,
    FsmDrawControlbarComponent,
    FsmDrawSurfaceComponent,
    FsmDrawPropertiesComponent,
    FsmDrawStateComponent,
    FsmDrawTransitionComponent,
    FsmDrawPropStateComponent,
    FsmDrawPropTransitionComponent],
  exports: [FsmDrawComponent]
})
export class FsmDrawModule { }
