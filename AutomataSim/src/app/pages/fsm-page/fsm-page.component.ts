import { Component, OnInit } from '@angular/core';
import { FsmFactoryService } from '../../modules/fsm-factory.service';
import { Fsm } from '../../modules/fsm/FsmPublic';

@Component({
  selector: 'app-fsm-page',
  templateUrl: './fsm-page.component.html',
  styleUrls: ['./fsm-page.component.css']
})
export class FsmPageComponent implements OnInit {

  fsm: Fsm;

  constructor(private _fsmSvc: FsmFactoryService) {
    this.fsm = _fsmSvc.getFsm('fsmPage');
  }

  ngOnInit() {
  }

}
