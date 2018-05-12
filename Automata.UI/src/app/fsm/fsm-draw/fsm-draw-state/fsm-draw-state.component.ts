import { FsmEvent } from './../classes/FsmEvents';
import { FsmState } from './../classes/Fsm';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-fsm-draw-state]',
  templateUrl: './fsm-draw-state.component.html',
  styleUrls: ['./fsm-draw-state.component.css']
})
export class FsmDrawStateComponent {

  // Input variables
  @Input() radius: number;
  @Input() state: FsmState;
  @Input() selected: boolean;
  @Output() click: EventEmitter<FsmEvent> = new EventEmitter<FsmEvent>();
  @Output() mousedown: EventEmitter<FsmEvent> = new EventEmitter<FsmEvent>();
  @Output() mouseup: EventEmitter<FsmEvent> = new EventEmitter<FsmEvent>();
  @Output() mousemove: EventEmitter<FsmEvent> = new EventEmitter<FsmEvent>();
  constructor() { }

  onCLick(evt) {
    this.click.emit({ srcElement: this.state, srcEvent: evt });
    evt.stopPropagation();
    return false;
  }
  onMouseDown(evt) {
    this.mousedown.emit({ srcElement: this.state, srcEvent: evt });
    evt.stopPropagation();
    return false;
  }
  onMouseUp(evt) {
    this.mouseup.emit({ srcElement: this.state, srcEvent: evt });
    evt.stopPropagation();
    return false;
  }
  onMouseMove(evt) {
    this.mousemove.emit({ srcElement: this.state, srcEvent: evt });
    evt.stopPropagation();
    return false;
  }
}
