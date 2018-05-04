import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fsm-draw',
  templateUrl: './fsm-draw.component.html',
  styleUrls: ['./fsm-draw.component.css']
})
export class FsmDrawComponent {


  @Input() background = 'none';
  mode = 'pointer';

  constructor() { }

}
