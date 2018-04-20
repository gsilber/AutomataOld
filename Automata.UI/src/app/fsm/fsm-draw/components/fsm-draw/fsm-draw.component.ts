import { SurfaceMouseEvent } from './../fsm-draw-surface/fsm-draw-surface.component';
import { Modes } from './../fsm-draw-controlbar/fsm-draw-controlbar.component';
import { Component, Input, ContentChild, ViewChild, ElementRef } from '@angular/core';
import { FsmDataService } from '../../../fsm-core/services/fsm-data.service';

@Component({
  selector: 'app-fsm-draw',
  templateUrl: './fsm-draw.component.html',
  styleUrls: ['./fsm-draw.component.css']
})
export class FsmDrawComponent {
  @Input() height = '500px';

  private mode: Modes = Modes.POINTER;
  constructor(public fsmSvc: FsmDataService) { }

  // Local surface event handlers
  onSurfaceClick = (evt: SurfaceMouseEvent) => {
    switch (this.mode) {
      case Modes.POINTER:
        this.onSurfaceClickPointer(evt);
        break;
      case Modes.STATE:
        this.onSurfaceClickState(evt);
        break;
      case Modes.TRANSITION:
        this.onSurfaceClickTransition(evt);
        break;
    }
  }

  onSurfaceClickPointer = (evt: SurfaceMouseEvent) {
    switch (evt.type) {
      case 'surface':
      console.log('mode: pointer, eventtarget: surface');
        break;
      case 'state':
        console.log('mode: pointer, eventtarget: state label: ' + evt.child.state.name);
        break;
      case 'transition':
        console.log('mode: pointer, eventtarget: transition');
      break;
    }

  }

  onSurfaceClickState = (evt: SurfaceMouseEvent) {
    switch (evt.type) {
      case 'surface':
        console.log('mode: state, eventtarget: surface');
        this.fsmSvc.addDefaultState(evt.surfaceX, evt.surfaceY);
        break;
      case 'state':
        console.log('mode: state, eventtarget: state label: ' + evt.child.state.name);
        break;
      case 'transition':
        console.log('mode: state, eventtarget: transition');
      break;
    }
  }

  onSurfaceClickTransition = (evt: SurfaceMouseEvent) {
    switch (evt.type) {
      case 'surface':
      console.log('mode: transition, eventtarget: surface');
        break;
      case 'state':
        console.log('mode: transition, eventtarget: state label: ' + evt.child.state.name);
        break;
      case 'transition':
        console.log('mode: transition, eventtarget: transition');
      break;
    }
  }

  // FsmDrawState event handlers

  // FsmDrawTransition event handlers

  // FsmDrawControlbar event handlers
  onCtrlbarMode = (mode: Modes) => {
    this.mode = mode;
  }

  onCtrlbarClear = () => console.log('clear');
  onCtrlbarHelp = () => console.log('help');
  onCtrlbarValidate = () => console.log('validate');
  onCtrlbarZoom = (direction) => console.log('zoom direction: ' + direction);
}
