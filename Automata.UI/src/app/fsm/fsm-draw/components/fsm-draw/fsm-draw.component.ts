import { FsmTransition } from './../../../fsm-core/services/fsm-data.service';
import { SurfaceMouseEvent } from './../fsm-draw-surface/fsm-draw-surface.component';
import { Modes, FsmDrawControlbarComponent } from './../fsm-draw-controlbar/fsm-draw-controlbar.component';
import {
  Component, Input, ContentChild, ViewChild, ElementRef,
  EventEmitter, Output, AfterViewInit, ChangeDetectorRef
} from '@angular/core';
import { FsmDataService, StateTypes, FsmState, FsmObject } from '../../../fsm-core/services/fsm-data.service';
import { FsmDrawPropsComponent } from '../fsm-draw-props/fsm-draw-props.component';

@Component({
  selector: 'app-fsm-draw',
  templateUrl: './fsm-draw.component.html',
  styleUrls: ['./fsm-draw.component.css']
})
export class FsmDrawComponent implements AfterViewInit {
  @Input() height = '500px';
  @Input() readonly = false;
  @Output() json: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(FsmDrawPropsComponent) props: FsmDrawPropsComponent;
  @ViewChild(FsmDrawControlbarComponent) ctrlBar: FsmDrawControlbarComponent;

  get zoomPercent() { return this._zoomPercent; }
  set zoomPercent(val) {
    if (val >= 50 && val <= 200){
      this._zoomPercent = val;
    }
  }
  selected: FsmObject = null;

  private mode: Modes = Modes.POINTER;
  stateContextOpen = null;
  transContextOpen = null;
  transitionSelectedState = null;
  mouseX: number;
  mouseY: number;
  mouseHover: FsmObject;
  private _zoomPercent = 100.0;

  constructor(public fsmSvc: FsmDataService, private _detect: ChangeDetectorRef) { }

  ngAfterViewInit() {
    // tslint:disable-next-line:max-line-length
    //  this.fsmSvc.fromJson('[{"sourceState":{"name":"q0","stateIndex":0,"x":278.0078125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q3","stateIndex":3,"x":245.00782775878906,"y":450.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition"},{"sourceState":{"name":"q0","stateIndex":0,"x":278.0078125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q5","stateIndex":5,"x":494.0078125,"y":276.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition"},{"sourceState":{"name":"q0","stateIndex":0,"x":278.0078125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q8","stateIndex":8,"x":335.0078125,"y":23.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition"},{"sourceState":{"name":"q0","stateIndex":0,"x":278.0078125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q2","stateIndex":2,"x":60.00782012939453,"y":271.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition"},{"sourceState":{"name":"q0","stateIndex":0,"x":278.0078125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q1","stateIndex":1,"x":59.00782012939453,"y":203.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition"},{"sourceState":{"name":"q0","stateIndex":0,"x":278.0078125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q7","stateIndex":7,"x":208.00782775878906,"y":24.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition"},{"sourceState":{"name":"q0","stateIndex":0,"x":278.0078125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q6","stateIndex":6,"x":493.0078125,"y":215.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition"},{"sourceState":{"name":"q0","stateIndex":0,"x":278.0078125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q4","stateIndex":4,"x":313.0078125,"y":451.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition"},{"sourceState":{"name":"q0","stateIndex":0,"x":278.0078125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q9","stateIndex":9,"x":104.00782012939453,"y":388.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition"},{"sourceState":{"name":"q0","stateIndex":0,"x":278.0078125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q12","stateIndex":12,"x":409.0078125,"y":366.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition"},{"sourceState":{"name":"q0","stateIndex":0,"x":278.0078125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q11","stateIndex":11,"x":429.0078125,"y":81.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition"},{"sourceState":{"name":"q0","stateIndex":0,"x":278.0078125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q10","stateIndex":10,"x":80.00782012939453,"y":88.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition"}]');
    // tslint:disable-next-line:max-line-length
    this.fsmSvc.fromJson('[{"sourceState":{"name":"q0","stateIndex":0,"x":408.6328125,"y":241.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q3","stateIndex":3,"x":96.63282012939453,"y":243.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition","rotation":132.51650818085807},{"sourceState":{"name":"q3","stateIndex":3,"x":96.63282012939453,"y":243.0078125,"stateType":"normal","type":"state"},"destState":{"name":"q3","stateIndex":3,"x":96.63282012939453,"y":243.0078125,"stateType":"normal","type":"state"},"charactersAccepted":"a","type":"transition","rotation":0}]');
    this._detect.detectChanges();
  }
  // Local surface event handlers
  onSurfaceClick = (evt: SurfaceMouseEvent) => {
    this.closeAllContextMenus();
    if (this.readonly) { return false; }
    if (this.mode === Modes.STATE && evt.type === 'surface') {
      this.ctrlBar.setMode(Modes.POINTER);
      this.selectObject(this.fsmSvc.addDefaultState(evt.surfaceX, evt.surfaceY));
    } else {
      if (this.mode === Modes.TRANSITION && evt.type === 'state' && !this.transitionSelectedState) {
        // start a transition
        this.transitionSelectedState = evt.child;
      } else {
        if (this.mode === Modes.TRANSITION && evt.type === 'state' && this.transitionSelectedState) {
          // end transition
          this.selectObject(this.fsmSvc.addTransition(this.transitionSelectedState, evt.child as FsmState));
          this.ctrlBar.setMode(Modes.POINTER);
          this.transitionSelectedState = null;
        } else { if (this.mode === 'transition' && evt.type !== 'state') { this.transitionSelectedState = null; } }
      }
    }
    this.json.emit(this.fsmSvc.toJson());
  }

  onSurfaceContextMenu = (evt: SurfaceMouseEvent) => {
    // popup an appropriate context menu
    if (evt.type === 'state' && this.mode === Modes.POINTER) {
      this.stateContextOpen = { x: evt.surfaceX, y: evt.surfaceY, obj: evt.child };
    }
    if (evt.type === 'transition' && this.mode === Modes.POINTER) {
      this.transContextOpen = { x: evt.surfaceX, y: evt.surfaceY, obj: evt.child };
    }
  }

  onSurfaceMouseMove = (evt: SurfaceMouseEvent) => {
    this.mouseX = evt.surfaceX;
    this.mouseY = evt.surfaceY;
    this.mouseHover = evt.child;
    if (this.readonly || evt.srcEvent.which !== 1) { return false; }
    if (this.mode === Modes.POINTER &&
      evt.srcEvent.buttons === 1 &&
      this.selected &&
      this.selected.type === 'state') {
      (this.selected as FsmState).x = evt.surfaceX;
      (this.selected as FsmState).y = evt.surfaceY;
    }
    if (this.mode === Modes.POINTER &&
      evt.srcEvent.buttons === 1 &&
      this.selected &&
      this.selected.type === 'transition') {
      const s = this.selected as FsmTransition;
      if (s.sourceState === s.destState) {
        const deltaX = s.sourceState.x - this.mouseX;
        const deltaY = s.sourceState.y - this.mouseY;
        const theta = Math.atan2(deltaY, deltaX);
        const thetad = theta * (180.0 / Math.PI);
        s.rotation = thetad + 180;
      } else {
        const d = ((s.destState.y - s.sourceState.y) * this.mouseX - (s.destState.x - s.sourceState.x) * this.mouseY +
          s.destState.x * s.sourceState.y - s.destState.y * s.sourceState.x) / Math.sqrt(Math.pow(s.destState.y - s.sourceState.y, 2) +
            Math.pow(s.destState.x - s.sourceState.x, 2));
            // this is a hack, since we are using control point, we need to scale back so the mouse is actually near the line.
        s.rotation = d * -1 - d * .8;
      }

    }
    this.json.emit(this.fsmSvc.toJson());
  }

  onSurfaceMouseDown = (evt: SurfaceMouseEvent) => {
    this.props.cancel();
    if (this.readonly || evt.srcEvent.which !== 1) { return false; }
    if (this.mode === Modes.POINTER) {
      if (evt.type === 'surface') { this.selected = null; } else { this.selectObject(evt.child); }

    }
    this.json.emit(this.fsmSvc.toJson());
  }

  // FsmDrawControlbar event handlers
  onCtrlbarMode = (mode: Modes) => { this.mode = mode; if (mode !== Modes.POINTER) { this.selected = null; } };
  onCtrlbarClear = () => this.fsmSvc.clear();
  onCtrlbarHelp = () => console.log('help');
  onCtrlbarValidate = () => console.log('validate');
  onCtrlbarZoom = (direction) => {
    const deltaPercent = 10 * direction * -1;
    this.zoomPercent -= deltaPercent;
    if (deltaPercent===0){
    this.zoomPercent=100;
    }
    console.log('zoom direction: ' + direction);
  }

  // Context menus handlers
  onStateContextClickDelete = (evt) => {
    this.props.cancel();
    this.fsmSvc.removeState(this.stateContextOpen.obj);
    this.stateContextOpen = null;
    this.selected = null;
    this.props.cancel();
    this.refreshProps();
    this.json.emit(this.fsmSvc.toJson());
  }
  onStateContextClickStart = (evt) => {
    FsmDataService.toggleStateValue(this.stateContextOpen.obj, StateTypes.START);
    this.stateContextOpen = null;
    this.refreshProps();
    this.json.emit(this.fsmSvc.toJson());
  }
  onStateContextClickFinal = (evt) => {
    FsmDataService.toggleStateValue(this.stateContextOpen.obj, StateTypes.FINAL);
    this.stateContextOpen = null;
    this.refreshProps();
    this.json.emit(this.fsmSvc.toJson());
  }

  onTransContextClickDelete = (evt) => {
    this.props.cancel();
    this.fsmSvc.removeTransition(this.transContextOpen.obj);
    this.transContextOpen = null;
    this.selected = null;
    this.props.cancel();
    this.refreshProps();
    this.json.emit(this.fsmSvc.toJson());
  }

  // Helper Methods
  startTransition(x: number, y: number): FsmTransition {
    let dest = { x: x, y: y, stateIndex: 99, name: 'temp', stateType: StateTypes.NORMAL, type: 'state' };
    if (this.mouseHover && this.mouseHover.type === 'state' && this.mouseHover === this.transitionSelectedState) {
      dest = this.transitionSelectedState;
    }
    return {
      sourceState: this.transitionSelectedState,
      destState: dest,
      charactersAccepted: '',
      type: 'transition',
      rotation: 0
    };
  }

  closeAllContextMenus() {
    this.stateContextOpen = null;
    this.transContextOpen = null;
  }
  selectObject(obj) {
    this.selected = obj;
  }
  refreshProps() {
    this.props.refresh();
  }
}
