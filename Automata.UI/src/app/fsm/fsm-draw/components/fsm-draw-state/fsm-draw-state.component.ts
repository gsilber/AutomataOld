import { FsmState, StateTypes } from './../../../fsm-core/services/fsm-data.service';
import { Component, Input, EventEmitter, Output, Renderer } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-fsm-draw-state]',
  templateUrl: './fsm-draw-state.component.html',
  styleUrls: ['./fsm-draw-state.component.css']
})
export class FsmDrawStateComponent {
  @Input() state: FsmState;
  @Input() selected: boolean;
  @Output() stateclick: EventEmitter<any> = new EventEmitter<any>();
  @Output() statedblclick: EventEmitter<any> = new EventEmitter<any>();
  @Output() statecontextmenu: EventEmitter<any> = new EventEmitter<any>();
  @Output() statemousedown: EventEmitter<any> = new EventEmitter<any>();
  @Output() statemouseenter: EventEmitter<any> = new EventEmitter<any>();
  @Output() statemouseleave: EventEmitter<any> = new EventEmitter<any>();
  @Output() statemousemove: EventEmitter<any> = new EventEmitter<any>();
  @Output() statemouseout: EventEmitter<any> = new EventEmitter<any>();
  @Output() statemouseover: EventEmitter<any> = new EventEmitter<any>();
  @Output() statemouseup: EventEmitter<any> = new EventEmitter<any>();

  radius = 30;

  constructor() { }

  isStart = () => this.state.stateType === 'start' || this.state.stateType === 'startfinal';
  isFinal = () => this.state.stateType === 'final' || this.state.stateType === 'startfinal';
  isNormal = () => this.state.stateType === 'normal';
  getFill = () => (this.isStart() ? 'yellow' : 'none');

  onClick = (evt: MouseEvent) => {
    this.stateclick.emit({ evt: evt, child: this.state, type: 'state' }); evt.stopPropagation(); return false;
  }
  onDblClick = (evt: MouseEvent) => {
    this.statedblclick.emit({ evt: evt, child: this.state, type: 'state' }); evt.stopPropagation(); return false;
  }
  onContextMenu = (evt: MouseEvent) => {
    this.statecontextmenu.emit({ evt: evt, child: this.state, type: 'state' }); evt.stopPropagation(); return false;
  }
  onMouseDown = (evt: MouseEvent) => {
    this.statemousedown.emit({ evt: evt, child: this.state, type: 'state' }); evt.stopPropagation(); return false;
  }
  onMouseEnter = (evt: MouseEvent) => {
    this.statemouseenter.emit({ evt: evt, child: this.state, type: 'state' }); evt.stopPropagation(); return false;
  }
  onMouseLeave = (evt: MouseEvent) => {
    this.statemouseleave.emit({ evt: evt, child: this.state, type: 'state' }); evt.stopPropagation(); return false;
  }
  onMouseMove = (evt: MouseEvent) => {
    this.statemousemove.emit({ evt: evt, child: this.state, type: 'state' }); evt.stopPropagation(); return false;
  }
  onMouseOut = (evt: MouseEvent) => {
    this.statemouseout.emit({ evt: evt, child: this.state, type: 'state' }); evt.stopPropagation(); return false;
  }
  onMouseOver = (evt: MouseEvent) => {
    this.statemouseover.emit({ evt: evt, child: this.state, type: 'state' }); evt.stopPropagation(); return false;
  }
  onMouseUp = (evt: MouseEvent) => {
    this.statemouseup.emit({ evt: evt, child: this.state, type: 'state' }); evt.stopPropagation(); return false;
  }

}
