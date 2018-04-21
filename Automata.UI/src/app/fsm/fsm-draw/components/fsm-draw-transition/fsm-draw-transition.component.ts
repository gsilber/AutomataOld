import { ChildMouseEvent } from './../fsm-draw-surface/fsm-draw-surface.component';
import { FsmTransition } from './../../../fsm-core/services/fsm-data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-fsm-draw-transition]',
  templateUrl: './fsm-draw-transition.component.html',
  styleUrls: ['./fsm-draw-transition.component.css']
})
export class FsmDrawTransitionComponent implements OnInit {

  @Input() transition: FsmTransition = null;
  @Input() selected: boolean;
  @Output() stateclick: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() statedblclick: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() statecontextmenu: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() statemousedown: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() statemouseenter: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() statemouseleave: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() statemousemove: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() statemouseout: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() statemouseover: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() statemouseup: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();

  constructor() { }

  ngOnInit() {
  }

}
