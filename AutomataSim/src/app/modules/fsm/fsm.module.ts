import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsmDrawComponent } from './fsm-draw/fsm-draw.component';
import { FsmViewComponent } from './fsm-draw/fsm-view/fsm-view.component';
import { FsmStateComponent } from './fsm-draw/fsm-view/fsm-state/fsm-state.component';
import { FsmTransitionComponent } from './fsm-draw/fsm-view/fsm-transition/fsm-transition.component';
import { FsmPropsComponent } from './fsm-draw/fsm-props/fsm-props.component';
import { FsmCtrlComponent } from './fsm-draw/fsm-ctrl/fsm-ctrl.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FsmDrawComponent, FsmViewComponent, FsmStateComponent, FsmTransitionComponent, FsmPropsComponent, FsmCtrlComponent],
  exports: [FsmDrawComponent, FsmViewComponent]
})
export class FsmModule { }
