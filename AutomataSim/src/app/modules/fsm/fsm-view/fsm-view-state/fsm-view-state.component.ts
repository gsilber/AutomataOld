import { Component, OnInit, Input } from '@angular/core';
import { FsmState } from '../../fsm-common/fsm-common.module';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-fsm-view-state]',
  templateUrl: './fsm-view-state.component.html',
  styleUrls: ['./fsm-view-state.component.css']
})
export class FsmViewStateComponent implements OnInit {

  @Input() label = 'q1';
  @Input() x = 50;
  @Input() y = 50;
  @Input() startState = false;
  @Input() finalState = false;
  @Input() stateRadius = 25;
  @Input() selected = false;

  constructor() { }

  ngOnInit() {
  }

}
