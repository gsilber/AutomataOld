import { FsmDrawComponent } from './../../fsm/fsm-draw/components/fsm-draw/fsm-draw.component';
import { FsmDataService } from './../../fsm/fsm-core/services/fsm-data.service';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-fsmpage',
  templateUrl: './fsmpage.component.html',
  styleUrls: ['./fsmpage.component.scss']
})
export class FsmpageComponent implements OnInit {
  @ViewChild(FsmDrawComponent) private _fsmDraw: FsmDrawComponent;
  @ViewChild('fsmTab') private _fsmTab: ElementRef;
  constructor(private _detect: ChangeDetectorRef, private _fsmSvc: FsmDataService) { }

  get empty() { return this._fsmDraw.emptyFSM; }
  get validFSM() {
    return this._fsmSvc.userFsm.valid;
  }
  get deterministic() {
    return this._fsmSvc.userFsm.deterministic;
  }
  ngOnInit() {
  }

  updateFsm() {
    setTimeout(_ => this._detect.detectChanges(), 500);
    return false;
  }
  onExampleLoad(example) {
    this._fsmDraw.cancelProps();
    this._fsmSvc.clearFsms();
    this._fsmTab.nativeElement.click();
    this._fsmSvc.fromJson(example);
  }
}
