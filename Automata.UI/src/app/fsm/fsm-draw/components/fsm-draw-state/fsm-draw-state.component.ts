import { FsmState, StateTypes } from './../../../fsm-core/services/fsm-data.service';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-fsm-draw-state]',
  templateUrl: './fsm-draw-state.component.html',
  styleUrls: ['./fsm-draw-state.component.css']
})
export class FsmDrawStateComponent {
  @Input() state: FsmState;

  radius = 30;

  constructor() { }

  isStart = () => this.state.stateType === 'start' || this.state.stateType === 'startfinal';
  isFinal = () => this.state.stateType === 'final' || this.state.stateType === 'startfinal';
  isNormal = () => this.state.stateType === 'normal';
  getFill = () => (this.isStart() ? 'yellow' : 'none');
}