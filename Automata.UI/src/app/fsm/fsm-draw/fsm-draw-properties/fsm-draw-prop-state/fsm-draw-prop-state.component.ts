import { FsmState } from './../../classes/Fsm';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fsm-draw-prop-state',
  templateUrl: './fsm-draw-prop-state.component.html',
  styleUrls: ['./fsm-draw-prop-state.component.css']
})
export class FsmDrawPropStateComponent {

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
    return true;
  }
  get isDirty() {
    return (this.name !== this.state.label || this.start !== this.state.start || this.final !== this.state.final);
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

}
