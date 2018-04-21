import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fsm-draw-props',
  templateUrl: './fsm-draw-props.component.html',
  styleUrls: ['./fsm-draw-props.component.css']
})
export class FsmDrawPropsComponent implements OnInit {

  @Input() object = null;

  constructor() { }

  ngOnInit() {
  }

}
