import { SurfaceMouseEvent } from './../fsm-draw-surface/fsm-draw-surface.component';
import { Modes } from './../fsm-draw-controlbar/fsm-draw-controlbar.component';
import { Component, Input, ContentChild, ViewChild, ElementRef } from '@angular/core';
import { FsmDataService } from '../../../fsm-core/services/fsm-data.service';
import { FsmDrawStateComponent } from '../fsm-draw-state/fsm-draw-state.component';

@Component({
  selector: 'app-fsm-draw',
  templateUrl: './fsm-draw.component.html',
  styleUrls: ['./fsm-draw.component.css']
})
export class FsmDrawComponent {
  @Input() height = '500px';
  selected: any = null;

  private mode: Modes = Modes.POINTER;
  constructor(public fsmSvc: FsmDataService) { }

  // Local surface event handlers
  onSurfaceClick = (evt: SurfaceMouseEvent) => {
    if (this.mode === Modes.STATE && evt.type === 'surface') {
      this.fsmSvc.addDefaultState(evt.surfaceX, evt.surfaceY);
    }
  }

  onSurfaceDblClick = (evt: SurfaceMouseEvent) => {
    if (this.mode === Modes.POINTER && evt.child instanceof FsmDrawStateComponent) {
      FsmDataService.toggleState(evt.child.state);
    }
  }
  onSurfaceMouseMove = (evt: SurfaceMouseEvent) => {
    if (this.mode === Modes.POINTER &&
      evt.srcEvent.buttons === 1 &&
      this.selected &&
      this.selected instanceof FsmDrawStateComponent) {
      this.selected.state.x = evt.surfaceX;
      this.selected.state.y = evt.surfaceY;
    }
  }

  onSurfaceMouseDown = (evt: SurfaceMouseEvent) => {
    if (this.mode === Modes.POINTER) {
      if (evt.type === 'state') { this.selected = evt.child; }
      if (evt.type === 'surface') { this.selected = null; }

    }
  }

  // FsmDrawControlbar event handlers
  onCtrlbarMode = (mode: Modes) => {
    this.mode = mode;
  }

  onCtrlbarClear = () => this.fsmSvc.clear();
  onCtrlbarHelp = () => console.log('help');
  onCtrlbarValidate = () => console.log('validate');
  onCtrlbarZoom = (direction) => console.log('zoom direction: ' + direction);
}
