import { FsmDrawComponent } from './../../fsm/fsm-draw/components/fsm-draw/fsm-draw.component';
import { FsmDataService } from './../../fsm/fsm-core/services/fsm-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-fsmpage',
  templateUrl: './fsmpage.component.html',
  styleUrls: ['./fsmpage.component.scss']
})
export class FsmpageComponent implements OnInit {
  @ViewChild(FsmDrawComponent) private _fsmDraw: FsmDrawComponent;

  constructor() { }

  get validFSM() {
    return this._fsmDraw.isValid;
  }
  get deterministic() {
    return this._fsmDraw.isDeterministic;
  }
  ngOnInit() {
  }

}
