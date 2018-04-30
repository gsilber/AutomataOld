import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsmCoreModule } from '../fsm-core/fsm-core.module';
import { FsmInfoComponent } from './components/fsm-info/fsm-info.component';
import { FsmNondetermInfoComponent } from './components/fsm-nondeterm-info/fsm-nondeterm-info.component';
import { FsmSimulationComponent } from './components/fsm-simulation/fsm-simulation.component';
import { FsmExamplesComponent } from './components/fsm-examples/fsm-examples.component';

@NgModule({
  imports: [
    FsmCoreModule,
    CommonModule
  ],
  exports: [FsmInfoComponent, FsmNondetermInfoComponent, FsmSimulationComponent, FsmExamplesComponent],
  declarations: [FsmInfoComponent, FsmNondetermInfoComponent, FsmSimulationComponent, FsmExamplesComponent]
})
export class FsmSupportModule { }
