import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {

  modalRef: NgbModalRef;
  buttons = [];
  message = '';
  title = 'Message';
  callback: any = null;

  @ViewChild('content') content: ElementRef;
  constructor(private modalService: NgbModal) { }

  open(msg: string, title = 'Message', buttons: string[] = ['Cancel'], callback = null) {
    this.buttons = buttons;
    this.message = msg;
    this.title = title;
    this.callback = callback;

    this.modalRef = this.modalService.open(this.content);
    this.modalRef.result.then((result) => {
      if (result) {
        this.callback(result);
      }
    }, err => console.log(err));
  }

  close() {
    this.modalRef.close();
  }

  buttonClick(result) {
    this.modalRef.close(result);
  }
}
