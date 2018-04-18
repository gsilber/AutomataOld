import { Modes } from './../fsm-draw-controlbar/fsm-draw-controlbar.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fsm-draw',
  templateUrl: './fsm-draw.component.html',
  styleUrls: ['./fsm-draw.component.css']
})
export class FsmDrawComponent {
  @Input() height = '500px';
  constructor() { }
  onCtrlbarClear = () => console.log('clear');
  onCtrlbarHelp = () => console.log('help');
  onCtrlbarMode = (mode: Modes) => console.log('switch to ' + mode);
  onCtrlbarValidate = () => console.log('validate');
  onCtrlbarZoom = (direction) => console.log('zoom direction: ' + direction);
}
