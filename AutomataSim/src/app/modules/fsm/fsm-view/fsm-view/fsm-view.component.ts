import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fsm-view',
  templateUrl: './fsm-view.component.html',
  styleUrls: ['./fsm-view.component.css']
})
export class FsmViewComponent implements OnInit {

  @Input() drawSize = 2000;
  @Input() zoomPercent = 100;

  // viewbox value for svg scaling
  public get zoomValue(): number {
    return this.drawSize * 2 / (this.zoomPercent / 100);
  }
  // size of containing scroll div
  public get scrollSize(): number {
    return this.drawSize * (this.zoomPercent / 100);
  }

  constructor() { }

  ngOnInit() {
  }

}
