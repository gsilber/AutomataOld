import { Fsm, FsmState } from './../../classes/Fsm';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-fsm-draw-prop-state',
  templateUrl: './fsm-draw-prop-state.component.html',
  styleUrls: ['./fsm-draw-prop-state.component.css']
})
export class FsmDrawPropStateComponent {

  @Output() statedeleted: EventEmitter<FsmState> = new EventEmitter<FsmState>();
  @Input() fsm: Fsm;
  @Input() set state(val: FsmState) {
    this._state = val;
    if (this._state) {
      this.name = this._state.label;
      this.start = this._state.start;
      this.final = this._state.final;
    } else {
      this.name = ''; this.start = this.final = false;
    }
  }

  get isValid() {
    if (!this.fsm) {
      return false;
    }
    if (this.fsm.states.filter(state => this._state && state !== this._state && state.label === this.name).length > 0) {
      this.errMsg = 'Duplicate state label';
      return false;
    }
    if (this.name.length > 4 || this.name.length < 2) {
      this.errMsg = 'Invalid state name';
      return false;
    }
    this.errMsg = '';
    return true;
  }
  get isDirty() {
    return (this._state && (this.name !== this._state.label || this.start !== this._state.start || this.final !== this._state.final));
  }
  private _state: FsmState = null;

  name: string;
  start: boolean;
  final: boolean;

  errMsg = '';

  constructor() { }

  onCancel() {
    this.name = this._state.label;
    this.start = this._state.start;
    this.final = this._state.final;
  }
  onSubmit() {
    if (this.isValid) {
      this._state.label = this.name;
      this._state.start = this.start;
      this._state.final = this.final;
    }
  }
  onDelete() {
    this.statedeleted.emit(this.fsm.deleteState(this._state));
  }

}
