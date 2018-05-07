import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fsm-draw-controlbar',
  templateUrl: './fsm-draw-controlbar.component.html',
  styleUrls: ['./fsm-draw-controlbar.component.css']
})
export class FsmDrawControlbarComponent {

  @Input() isValid = false;
  @Input() set mode(val) { this._currentMode = val; }
  @Output() modeChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() zoom: EventEmitter<number> = new EventEmitter<number>();

  private _currentMode = 'pointer';
  get currentMode() { return this._currentMode; }
  set currentMode(val: string) { this._currentMode = val; this.modeChange.emit(val); }
  constructor() { }

  // property click event handlers

  // surface click event handlers

  // controlbar click event handlers
  onModeChange(mode) {
    this.currentMode = mode;
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
  onZoom(direction) { this.zoom.emit(direction); return false; }
}
