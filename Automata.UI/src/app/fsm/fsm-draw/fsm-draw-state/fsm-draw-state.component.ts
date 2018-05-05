import { FsmState } from './../classes/Fsm';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-fsm-draw-state]',
  templateUrl: './fsm-draw-state.component.html',
  styleUrls: ['./fsm-draw-state.component.css']
})
export class FsmDrawStateComponent implements OnInit {

  // Input variables
  @Input() state: FsmState;
  @Input() selected: boolean;

  constructor() { }

  ngOnInit() {
  }

}
