import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';


export class MenuItem {
  public title: string;
  public routerLink: string;
  public hasIcon: boolean;
  public iconClass = '';
}


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class HeaderMenuModule { }
