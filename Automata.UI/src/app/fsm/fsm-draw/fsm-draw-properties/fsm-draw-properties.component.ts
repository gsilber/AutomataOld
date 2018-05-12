import { Fsm, FsmObject, FsmState, FsmTransition } from './../classes/Fsm';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fsm-draw-properties',
  templateUrl: './fsm-draw-properties.component.html',
  styleUrls: ['./fsm-draw-properties.component.css']
})
export class FsmDrawPropertiesComponent {

  @Input() fsm: Fsm;
  @Input() set mode(val) { this._mode = val; }
  @Input() activeobject: FsmObject;
  @Output() clearselection: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _mode = 'pointer';

  get state() {
    return (this.activeobject && this.activeobject.type === 'state' ? this.activeobject as FsmState : null);
  }
  get transition() {
    return (this.activeobject && this.activeobject.type === 'transition' ? this.activeobject as FsmTransition : null);
  }

  constructor() { }

  onObjectDeleted(object) {
    this.activeobject = null;
    this.clearselection.emit(true);
  }
}
