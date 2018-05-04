import { MenuItem } from './../header-menu.module';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menuData: MenuItem[] = [];
  @Input() title = '';

  constructor() { }

  ngOnInit() {
  }

}
