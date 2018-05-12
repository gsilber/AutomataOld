import { Fsm, FsmObject } from './../classes/Fsm';
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

  constructor() { }

  onObjectDeleted(object) {
    this.activeobject = null;
    this.clearselection.emit(true);
  }
}
