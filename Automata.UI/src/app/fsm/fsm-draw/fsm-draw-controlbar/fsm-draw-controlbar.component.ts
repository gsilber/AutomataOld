import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fsm-draw-controlbar',
  templateUrl: './fsm-draw-controlbar.component.html',
  styleUrls: ['./fsm-draw-controlbar.component.css']
})
export class FsmDrawControlbarComponent {

  @Input() isValid = false;
  @Input() get mode() { return this._mode; }
  set mode(val) { this._mode = val; this.modeChange.emit(this._mode); }
  @Output() modeChange: EventEmitter<string> = new EventEmitter<string>();

  private _mode = 'pointer';
  constructor() { }

  // property click event handlers

  // surface click event handlers

  // controlbar click event handlers
  onModeChange(mode) {
    this.mode = mode;
    return false;
  }
  onNew() {
    return false;
  }
  onLoad() {
    return false;
  }
  onSave() {
    return false;
  }
  onExport() {
    return false;
  }
  onZoom() {
    return false;
  }
}
