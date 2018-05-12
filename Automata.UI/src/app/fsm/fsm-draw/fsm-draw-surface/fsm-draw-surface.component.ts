import { FsmEvent } from './../classes/FsmEvents';
import { Fsm, FsmState, FsmObject, FsmTransition } from './../classes/Fsm';
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

  @Input() readonly = false;
  @Input() set mode(val: string) { this._currentMode = val; }
  @Output() modeChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() set selected(val: FsmObject) { this.selectedChild = val; }
  @Output() selectedChange: EventEmitter<FsmObject> = new EventEmitter<FsmObject>();

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
  private _dimension = 2000;

  private _selectedChild: FsmObject = null;
  private _partialTransition: FsmTransition = null;
  get selectedChild() { return this._selectedChild; }
  set selectedChild(val: FsmObject) { this._selectedChild = val; this.selectedChange.emit(val); }
  private _currentMode: string;
  get currentMode() { return this._currentMode; }
  set currentMode(val) { this._currentMode = val; this.modeChange.emit(val); }
  // state maintenence properties

  private movingState: FsmState = null;

  constructor() { }

  // surface event handlers
  onClick(evt) {
    this.selectedChild = null;
    if (this.readonly) { return; }
    if (this.currentMode === 'state') {
      const surfacePt = this.clientToSurface(evt.x, evt.y);
      this.selectedChild = this.fsm.addNewState(surfacePt.x, surfacePt.y);
      this.currentMode = 'pointer';
    }
    this._partialTransition = null;
    evt.stopPropagation();
    return false;
  }
  onMouseMove(evt) {
    if (this.readonly) { return; }
    if (this.currentMode === 'pointer') {
      if (this.movingState !== null) {
        this.movingState.position = this.clientToSurface(evt.x, evt.y);
      }
    }
  }

  // state event handlers
  onStateClick(evt) {
    if (this.readonly) { return; }
    switch (this.currentMode) {
      case 'pointer':
        this.selectedChild = evt.srcElement;
        break;
      case 'transition':
        // begin or end transition creation
        const tempState = evt.srcElement as FsmState;
        if (!this._partialTransition) {
          this._partialTransition =
            new FsmTransition({ charactersAccepted: 'a', rotation: 0, startState: '', endState: '' }, evt.srcElement, null);
        } else {
          const newTrans = this.fsm.addNewTransition(this._partialTransition.startState, evt.srcElement);
          this._partialTransition = null;
          this.selectedChild = newTrans;
          this.currentMode = 'pointer';
        }
        break;
    }
  }

  onStateMouseDown(evt: FsmEvent) {
    if (this.readonly) { return; }
    if (this.currentMode === 'pointer') {
      this.movingState = evt.srcElement as FsmState;
    }
  }
  onStateMouseUp(evt) {
    if (this.readonly) { return; }
    if (this.currentMode === 'pointer') {
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
