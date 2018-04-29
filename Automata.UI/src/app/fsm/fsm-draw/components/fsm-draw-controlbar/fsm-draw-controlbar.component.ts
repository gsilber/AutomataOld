import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';


export enum Modes { POINTER = 'pointer', STATE = 'state', TRANSITION = 'transition' }

@Component({
  selector: 'app-fsm-draw-controlbar',
  templateUrl: './fsm-draw-controlbar.component.html',
  styleUrls: ['./fsm-draw-controlbar.component.scss']
})
export class FsmDrawControlbarComponent implements OnInit {
  // variables
  imode: Modes = Modes.POINTER;
  // output event emitters
  @Output() mode: EventEmitter<Modes> = new EventEmitter<Modes>();
  @Output() zoom: EventEmitter<number> = new EventEmitter<number>();
  @Output() newfile: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() loadfile: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() savefile: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() saveimage: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() help: EventEmitter<boolean> = new EventEmitter<boolean>();

  // input variables
  @Input() readonly = false;
  @Input() isValid = false;


  // Lifecycle hooks
  ngOnInit() {
    this.imode = Modes.POINTER;
    this.mode.emit(Modes.POINTER);
    this.newfile.emit(true);
  }

  // public method to allow external interface to change mode
  public setMode = (mode: Modes) => {
    this.imode = mode;
    this.mode.emit(mode);
  }
  // Local Event Handlers
  onModeChange = (mode) => { this.imode = mode; this.mode.emit(mode); return false; };
  onZoom = (direction) => { this.zoom.emit(direction); return false; };
  onNew = () => { this.newfile.emit(true); return false; };
  onLoad = () => { this.loadfile.emit(true); return false; };
  onSave = () => { this.savefile.emit(true); return false; };
  onExport = () => { this.saveimage.emit(true); return false; };
}
