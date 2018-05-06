import { FsmEvent } from './../classes/FsmEvents';
import { Fsm, FsmState, FsmObject } from './../classes/Fsm';
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-fsm-draw-surface',
  templateUrl: './fsm-draw-surface.component.html',
  styleUrls: ['./fsm-draw-surface.component.css']
})
export class FsmDrawSurfaceComponent {

  @ViewChild('surfaceSVG') svg: ElementRef;

  @Input() set dimension(val) {
    this._dimension = val;
    this.scrollvalue = val;
  }
  @Input() set mode(val: string) { if (val !== 'pointer') { this.selectedChild = null; } this._mode = val; }
  @Output() modeChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() set zoompercent(val) {
    this.scrollvalue = this.dimension / (val / 100.0);
  }
  @Input() fsm: Fsm;
  @Input() stateRadius = 13;

  get dimension() {
    return this._dimension;
  }
  get scrollsize() {
    return this.dimension * this.dimension / this.scrollvalue;
  }

  scrollvalue: number;
  selectedChild: FsmObject = null;
  private _dimension = 2000;
  private _mode: string;
  // state maintenence properties

  private movingState: FsmState = null;

  constructor() { }

  // surface event handlers
  onClick(evt) {
    this.selectedChild = null;
    if (this._mode === 'state') {
      const surfacePt = this.clientToSurface(evt.x, evt.y);
      this.selectedChild = this.fsm.addNewState(surfacePt.x, surfacePt.y);
      this.modeChange.emit('pointer');
    }
    evt.stopPropagation();
    return false;
  }
  onMouseMove(evt) {
    if (this._mode === 'pointer') {
      if (this.movingState !== null) {
        this.movingState.position = this.clientToSurface(evt.x, evt.y);
      }
    }
  }

  // state event handlers
  onStateClick(evt) {
    if (this._mode === 'pointer') {
      this.selectedChild = evt.srcElement;
    }
  }

  onStateMouseDown(evt: FsmEvent) {
    if (this._mode === 'pointer') {
      this.movingState = evt.srcElement as FsmState;
    }
  }
  onStateMouseUp(evt) {
    if (this._mode === 'pointer') {
      this.movingState = null;
    }
  }
  // helper functions
  private clientToSurface = (x: number, y: number) => {
    const pt = this.svg.nativeElement.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(this.svg.nativeElement.getScreenCTM().inverse());
  }

}
