import {  FsmState } from './../../classes/Fsm';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fsm-draw-prop-state',
  templateUrl: './fsm-draw-prop-state.component.html',
  styleUrls: ['./fsm-draw-prop-state.component.css']
})
export class FsmDrawPropStateComponent  {

  @Input() state: FsmState;

  constructor() { }


}
