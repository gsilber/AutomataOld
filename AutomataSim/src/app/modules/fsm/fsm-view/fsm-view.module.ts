import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsmViewComponent } from './fsm-view/fsm-view.component';
import { FsmCommonModule } from '../fsm-common/fsm-common.module';
import { FsmViewStateComponent } from './fsm-view-state/fsm-view-state.component';

@NgModule({
  imports: [
    CommonModule,
    FsmCommonModule
  ],
  declarations: [FsmViewComponent, FsmViewStateComponent],
  exports: [FsmViewComponent]
})
export class FsmViewModule { }
