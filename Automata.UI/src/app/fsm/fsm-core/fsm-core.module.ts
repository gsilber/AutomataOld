import { FsmDataService } from './services/fsm-data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [FsmDataService],
  declarations: []
})
export class FsmCoreModule { }
