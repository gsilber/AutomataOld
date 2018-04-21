import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-context-menu-item',
  templateUrl: './context-menu-item.component.html',
  styleUrls: ['./context-menu-item.component.css']
})
export class ContextMenuItemComponent implements OnInit {

  @Input() checked = false;
  @Input() divider = false;
  @Output() itemclick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  constructor() { }

  ngOnInit() {
  }

  itemClicked = (evt) => {
    evt.preventDefault();
    this.itemclick.emit(evt);
  }
}
