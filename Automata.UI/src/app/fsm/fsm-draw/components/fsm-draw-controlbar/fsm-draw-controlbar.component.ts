import { Component, Output, EventEmitter, OnInit } from '@angular/core';


export enum Modes { POINTER = 'pointer', STATE = 'state', TRANSITION = 'transition' }

@Component({
  selector: 'app-fsm-draw-controlbar',
  templateUrl: './fsm-draw-controlbar.component.html',
  styleUrls: ['./fsm-draw-controlbar.component.scss']
})
export class FsmDrawControlbarComponent implements OnInit {

  @Output() mode: EventEmitter<Modes> = new EventEmitter<Modes>();
  @Output() zoom: EventEmitter<number> = new EventEmitter<number>();
  @Output() clear: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() validate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() help: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  // Lifecycle hooks
  ngOnInit() {
    this.mode.emit(Modes.POINTER);
    this.clear.emit(true);
  }

  // Event Handlers
  onModeChange = (mode) => { this.mode.emit(mode); return false; };
  onZoom = (direction) => { this.zoom.emit(direction); return false; };
  onClear = () => { this.clear.emit(true); return false; };
  onValidate = () => { this.validate.emit(true); return false; };
  onHelp = () => { this.help.emit(true); return false; };
}
