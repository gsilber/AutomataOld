import { FsmDrawModule } from './fsm-draw/fsm-draw.module';
import { FsmCoreModule } from './fsm-core/fsm-core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FsmDrawModule
  ],
  declarations: []
})
export class FsmModule { }
