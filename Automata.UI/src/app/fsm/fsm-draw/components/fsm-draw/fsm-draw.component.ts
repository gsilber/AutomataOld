import { SurfaceMouseEvent } from './../fsm-draw-surface/fsm-draw-surface.component';
import { Modes } from './../fsm-draw-controlbar/fsm-draw-controlbar.component';
import { Component, Input, ContentChild, ViewChild, ElementRef } from '@angular/core';
import { FsmDataService, StateTypes, FsmState, FsmObject } from '../../../fsm-core/services/fsm-data.service';
import { FsmDrawPropsComponent } from '../fsm-draw-props/fsm-draw-props.component';

@Component({
  selector: 'app-fsm-draw',
  templateUrl: './fsm-draw.component.html',
  styleUrls: ['./fsm-draw.component.css']
})
export class FsmDrawComponent {
  @Input() height = '500px';
  @Input() readonly = false;

  @ViewChild(FsmDrawPropsComponent) props: FsmDrawPropsComponent;
  selected: FsmObject = null;

  private mode: Modes = Modes.POINTER;
  stateContextOpen = null;

  constructor(public fsmSvc: FsmDataService) { }

  // Local surface event handlers
  onSurfaceClick = (evt: SurfaceMouseEvent) => {
    this.closeAllContextMenus();
    if (this.readonly) { return false; }
    if (this.mode === Modes.STATE && evt.type === 'surface') {
      this.selectObject(this.fsmSvc.addDefaultState(evt.surfaceX, evt.surfaceY));
    }
  }

  onSurfaceDblClick = (evt: SurfaceMouseEvent) => {
    if (this.readonly) { return false; }
    if (this.mode === Modes.POINTER && evt.type === 'state') {
      FsmDataService.toggleState(evt.child as FsmState);
      this.refreshProps();
    }
  }
  onSurfaceContextMenu = (evt: SurfaceMouseEvent) => {
    // popup an appropriate context menu
    if (evt.type === 'state' && this.mode === Modes.POINTER) {
      this.stateContextOpen = { x: evt.surfaceX, y: evt.surfaceY, obj: evt.child };
    }
  }

  onSurfaceMouseMove = (evt: SurfaceMouseEvent) => {
    if (this.readonly || evt.srcEvent.which !== 1) { return false; }
    if (this.mode === Modes.POINTER &&
      evt.srcEvent.buttons === 1 &&
      this.selected &&
      this.selected.type === 'state') {
        (this.selected as FsmState).x = evt.surfaceX;
        (this.selected as FsmState).y = evt.surfaceY;
    }
  }

  onSurfaceMouseDown = (evt: SurfaceMouseEvent) => {
    this.props.cancel();
    if (this.readonly || evt.srcEvent.which !== 1) { return false; }
    if (this.mode === Modes.POINTER) {
      if (evt.type === 'state') { this.selectObject(evt.child); }
      if (evt.type === 'surface') { this.selected = null; }

    }
  }

  // FsmDrawControlbar event handlers
  onCtrlbarMode = (mode: Modes) => this.mode = mode;
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
  }
  onStateContextClickStart = (evt) => {
    FsmDataService.toggleStateValue(this.stateContextOpen.obj, StateTypes.START);
    this.stateContextOpen = null;
    this.refreshProps();
  }
  onStateContextClickFinal = (evt) => {
    FsmDataService.toggleStateValue(this.stateContextOpen.obj, StateTypes.FINAL);
    this.stateContextOpen = null;
    this.refreshProps();
  }

  // Helper Methods
  closeAllContextMenus() {
    this.stateContextOpen = null;
  }
  selectObject(obj) {
    this.selected = obj;
  }
  refreshProps() {
    this.props.refresh();
  }
}
