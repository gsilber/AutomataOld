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
  partialTransition: FsmTransition = null;
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
    if (this.readonly) { return; }
    if (this.currentMode === 'state') {
      const surfacePt = this.clientToSurface(evt.x, evt.y);
      this.selectedChild = this.fsm.addNewState(surfacePt.x, surfacePt.y);
      this.currentMode = 'pointer';
    }
    // clear transition creation if click on surface
    this.partialTransition = null;
    evt.stopPropagation();
    return false;
  }
  onMouseDown(evt) {
    this.selectedChild = null;
  }
  onMouseMove(evt) {
    if (this.readonly) { return; }
    switch (this.currentMode) {
      case 'pointer':
        if (this.movingState) {
          this.movingState.position = this.clientToSurface(evt.x, evt.y);
        }
        if (this.selectedChild && this.selectedChild.type === 'transition' && evt.buttons === 1) {
          const trans = this.selectedChild as FsmTransition;
          const position = this.clientToSurface(evt.x, evt.y);
          if (trans.startState === trans.endState) {
            const deltaX = trans.startState.position.x - position.x;
            const deltaY = trans.startState.position.y - position.y;
            const theta = Math.atan2(deltaY, deltaX);
            const thetad = theta * (180.0 / Math.PI);
            trans.rotation = thetad + 180;
          } else {
            const d = ((trans.endState.position.y - trans.startState.position.y) * position.x -
              (trans.endState.position.x - trans.startState.position.x) * position.y +
              trans.endState.position.x * trans.startState.position.y - trans.endState.position.y *
              trans.startState.position.x) / Math.sqrt(Math.pow(trans.endState.position.y - trans.startState.position.y, 2) +
                Math.pow(trans.endState.position.x - trans.startState.position.x, 2));
            // this is a hack, since we are using control point, we need to scale back so the mouse is actually near the line.
            trans.rotation = d * -1 - d * .8;

          }
        }
        break;
      case 'transition':
        if (this.partialTransition) {
          const position = this.clientToSurface(evt.x, evt.y);
          this.partialTransition.endState = new FsmState({ x: position.x, y: position.y, label: '', start: false, final: false });
        }
        break;
    }
    evt.stopPropagation();
    return false;
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
        if (!this.partialTransition) {
          this.partialTransition =
            new FsmTransition({ charactersAccepted: 'a', rotation: 0, startState: '', endState: '' }, evt.srcElement,
              evt.srcElement as FsmState);
        } else {
          const newTrans = this.fsm.addNewTransition(this.partialTransition.startState, evt.srcElement);
          this.partialTransition = null;
          this.selectedChild = newTrans;
          this.currentMode = 'pointer';
        }
        break;
    }
  }
  onStateMouseMove(evt: FsmEvent) {
    switch (this.currentMode) {
      case 'transition':
        if (this.partialTransition) {
          this.partialTransition.endState = evt.srcElement as FsmState;
        }
        break;
    }

  }
  onStateMouseDown(evt: FsmEvent) {
    if (this.readonly) { return; }
    if (this.currentMode === 'pointer') {
      this.movingState = evt.srcElement as FsmState;
      this.selectedChild = evt.srcElement;
    }
  }
  onStateMouseUp(evt) {
    if (this.readonly) { return; }
    if (this.currentMode === 'pointer') {
      this.movingState = null;
    }
  }
  // transition event handlers
  onTransitionMouseDown(evt) {
    if (this.readonly) { return; }
    if (this.currentMode === 'pointer') {
      this.selectedChild = evt.srcElement;
    }
  }
  onTransitionMouseMove(evt: FsmEvent) {
    if (this.currentMode === 'pointer') {
      this.onMouseMove(evt.srcEvent);
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
