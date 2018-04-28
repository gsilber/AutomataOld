import { FsmDataService } from './../../fsm/fsm-core/services/fsm-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fsmpage',
  templateUrl: './fsmpage.component.html',
  styleUrls: ['./fsmpage.component.scss']
})
export class FsmpageComponent implements OnInit {

  constructor(private fsmSvc: FsmDataService) { }

  get validFSM() {
    return this.fsmSvc.machineValid;
  }
  get deterministic() {
    return this.fsmSvc.isDeterministic;
  }
  ngOnInit() {
  }

}
