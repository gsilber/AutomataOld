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
  selected: FsmObject = null;

  private mode: Modes = Modes.POINTER;
  stateContextOpen = null;
  transContextOpen = null;
  transitonSelectedState = null;
  mouseX: number;
  mouseY: number;

  constructor(public fsmSvc: FsmDataService, private _detect: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.fsmSvc.fromJson('[' +
      '{"sourceState":{"name":"q0","stateIndex":0,"x":481.0078125,"y":316.0078125,"stateType":"normal","type":"state"},' +
      '"destState":{"name":"q1","stateIndex":1,"x":261.0078125,"y":160.0078125,"stateType":"normal","type":"state"},' +
      '"charactersAccepted":"a","type":"transition"}]');
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
      if (this.mode === Modes.TRANSITION && evt.type === 'state' && !this.transitonSelectedState) {
        // start a transition
        this.transitonSelectedState = evt.child;
      } else {
        if (this.mode === Modes.TRANSITION && evt.type === 'state' && this.transitonSelectedState) {
          // end transition
          this.selectObject(this.fsmSvc.addTransition(this.transitonSelectedState, evt.child as FsmState));
          this.ctrlBar.setMode(Modes.POINTER);
          this.transitonSelectedState = null;
        } else { if (this.mode === 'transition' && evt.type !== 'state') { this.transitonSelectedState = null; } }
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
    if (this.readonly || evt.srcEvent.which !== 1) { return false; }
    if (this.mode === Modes.POINTER &&
      evt.srcEvent.buttons === 1 &&
      this.selected &&
      this.selected.type === 'state') {
      (this.selected as FsmState).x = evt.surfaceX;
      (this.selected as FsmState).y = evt.surfaceY;
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
  onCtrlbarZoom = (direction) => console.log('zoom direction: ' + direction);

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
    return {
      sourceState: this.transitonSelectedState,
      destState: { x: x, y: y, stateIndex: 99, name: 'temp', stateType: StateTypes.NORMAL, type: 'state' },
      charactersAccepted: '',
      type: 'transition'
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
