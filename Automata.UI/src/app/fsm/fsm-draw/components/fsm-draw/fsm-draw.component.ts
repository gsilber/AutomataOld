import { AlertModalComponent, AlertModalResult } from './../../../../reusable/alert-modal/alert-modal/alert-modal.component';
import { SurfaceMouseEvent } from './../fsm-draw-surface/fsm-draw-surface.component';
import { Component, Input, ViewChild, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FsmTransition, FsmDataService, StateTypes, FsmState, FsmObject } from '../../../fsm-core/services/fsm-data.service';
import { FsmDrawPropsComponent } from '../fsm-draw-props/fsm-draw-props.component';
import { Modes, FsmDrawControlbarComponent } from './../fsm-draw-controlbar/fsm-draw-controlbar.component';

@Component({
  selector: 'app-fsm-draw',
  templateUrl: './fsm-draw.component.html',
  styleUrls: ['./fsm-draw.component.css']
})
export class FsmDrawComponent implements AfterViewInit {
  // variables
  selected: FsmObject = null;
  scrollsize = 2000;
  stateContextOpen = null;
  transContextOpen = null;
  transitionSelectedState = null;
  mouseX: number;
  mouseY: number;
  mouseHover: FsmObject;
  dirty = false;

  // private variables
  private _zoomPercent = 100.0;
  private mode: Modes = Modes.POINTER;
  private dataBlob: Blob;

  // input variables
  @Input() readonly = false;

  // dom components
  @ViewChild(FsmDrawPropsComponent) props: FsmDrawPropsComponent;
  @ViewChild(FsmDrawControlbarComponent) ctrlBar: FsmDrawControlbarComponent;
  @ViewChild(AlertModalComponent) popup: AlertModalComponent;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileOutput') fileOutput: ElementRef;

  // properties
  get zoomPercent() { return this._zoomPercent; }
  set zoomPercent(val) {
    if (val >= 50 && val <= 200) {
      this.scrollsize = 2000 * val / 100.0;
      this._zoomPercent = val;

    }
  }
  get startTransition(): FsmTransition {
    let dest = { x: this.mouseX, y: this.mouseY, stateIndex: 99, name: 'temp', stateType: StateTypes.NORMAL, type: 'state' };
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

  constructor(public fsmSvc: FsmDataService, private _detect: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this._detect.detectChanges();
  }
  // Local surface event handlers
  onSurfaceClick = (evt: SurfaceMouseEvent) => {
    this.closeAllContextMenus();
    if (this.readonly) { return false; }
    if (this.mode === Modes.STATE && evt.type === 'surface') {
      this.ctrlBar.setMode(Modes.POINTER);
      this.selectObject(this.fsmSvc.addDefaultState(evt.surfaceX, evt.surfaceY));
      this.dirty = true;
    } else {
      if (this.mode === Modes.TRANSITION && evt.type === 'state' && !this.transitionSelectedState) {
        // start a transition
        this.transitionSelectedState = evt.child;
      } else {
        if (this.mode === Modes.TRANSITION && evt.type === 'state' && this.transitionSelectedState) {
          // end transition
          this.selectObject(this.fsmSvc.addTransition(this.transitionSelectedState, evt.child as FsmState));
          this.dirty = true;
          this.ctrlBar.setMode(Modes.POINTER);
          this.transitionSelectedState = null;
        } else { if (this.mode === 'transition' && evt.type !== 'state') { this.transitionSelectedState = null; } }
      }
    }
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
      this.dirty = true;
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
      this.dirty = true;
    }
  }

  onSurfaceMouseDown = (evt: SurfaceMouseEvent) => {
    this.props.cancel();
    if (this.readonly || evt.srcEvent.which !== 1) { return false; }
    if (this.mode === Modes.POINTER) {
      if (evt.type === 'surface') { this.selected = null; } else { this.selectObject(evt.child); }
    }
  }

  // FsmDrawControlbar event handlers
  onCtrlbarMode = (mode: Modes) => { this.mode = mode; if (mode !== Modes.POINTER) { this.selected = null; } };
  onCtrlbarNew = () => this.popupFileDirty('clear');
  onCtrlbarLoad = () => this.popupFileDirty('loadFile');
  onCtrlbarSave = () => this.saveFile();
  onCtrlbarValidate = () => this.validate();
  onCtrlbarZoom = (direction) => {
    const deltaPercent = 10 * direction * -1;
    this.zoomPercent -= deltaPercent;
    if (deltaPercent === 0) {
      this.zoomPercent = 100;
    }
  }

  // Context menus handlers
  onStateContextClickDelete = (evt) => {
    this.props.cancel();
    this.fsmSvc.removeState(this.stateContextOpen.obj);
    this.stateContextOpen = null;
    this.selected = null;
    this.props.cancel();
    this.refreshProps();
    this.dirty = true;
  }
  onStateContextClickStart = (evt) => {
    FsmDataService.toggleStateValue(this.stateContextOpen.obj, StateTypes.START);
    this.stateContextOpen = null;
    this.refreshProps();
    this.dirty = true;
  }
  onStateContextClickFinal = (evt) => {
    FsmDataService.toggleStateValue(this.stateContextOpen.obj, StateTypes.FINAL);
    this.stateContextOpen = null;
    this.refreshProps();
    this.dirty = true;
  }

  onTransContextClickDelete = (evt) => {
    this.props.cancel();
    this.fsmSvc.removeTransition(this.transContextOpen.obj);
    this.transContextOpen = null;
    this.selected = null;
    this.props.cancel();
    this.refreshProps();
    this.dirty = true;
  }

  // UI Action methods
  popupFileDirty(callback: string) {
    if (this.dirty) {
      this.popup.open('The file has changed.  \r\nWould you like to save the FSM to a file?', 'Warning',
        ['Yes', 'No', 'Cancel'], callback);
      return;
    }
    this[callback]();
  }

  onmodalclose(result: AlertModalResult) {
    if (result.result === 'Yes') {
      this.saveFile();
      if (result.callback) { this[result.callback](); }
      return;
    }
    if (result.result === 'No') {
      if (result.callback) { this[result.callback](); }
      return;
    }
  }

  // Helper Methods

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

  saveFile() {
    if (this.fsmSvc.machineValid) {
      const blob = new Blob([this.fsmSvc.toJson() + '\n'], { type: 'application/json' });
      this.fileOutput.nativeElement.href = window.URL.createObjectURL(blob);
      this.fileOutput.nativeElement.download = 'save.fsm';
      this.fileOutput.nativeElement.click();
      this.dirty = false;
    } else {
      this.popup.open('The current FSM is invalid.  Save Failed', 'Error');
    }
  }

  loadFile() {
    this.props.cancel();
    this.fsmSvc.clear();
    this.fileInput.nativeElement.click();
    this.dirty = false;
  }
  onFileLoad(evt) {
    const self = this;
    if (evt.target && evt.target.files && evt.target.files.length > 0) {
      const f = evt.target.files[0];
      const reader = new FileReader();
      reader.onload = (function (file) {
        return function (e) {
          self.fsmSvc.clear();
          console.log(e.target.result);
          self.fsmSvc.fromJson(e.target.result);
        };
      })(f);
      reader.readAsText(f);

    }
  }

  clear() {
    this.fsmSvc.clear();
    this.dirty = false;
  }
  validate() {
    if (this.fsmSvc.machineValid) {
      this.popup.open('The machine is not valid', 'Error');
    } else {
      this.popup.open('The machine is valid', 'Success');
    }
  }
}
