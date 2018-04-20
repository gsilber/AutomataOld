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
  onSurfaceClick = (evt) => {
    console.log(evt);
    switch (this.mode) {
      case Modes.POINTER:
        // select if an object is present
        break;
      case Modes.STATE:
        // create a new state if not on a state
        this.fsmSvc.addDefaultState(evt.surfaceX, evt.surfaceY);
        console.log(evt);
        break;
      case Modes.TRANSITION:
        // create a new transition if on a state
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
