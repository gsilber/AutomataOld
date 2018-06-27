import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsmViewComponent } from './fsm-view/fsm-view.component';
import { FsmCommonModule } from '../fsm-common/fsm-common.module';

@NgModule({
  imports: [
    CommonModule,
    FsmCommonModule
  ],
  declarations: [FsmViewComponent],
  exports: [FsmViewComponent]
})
export class FsmViewModule { }
