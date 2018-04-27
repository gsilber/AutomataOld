import { FsmCoreModule } from './fsm/fsm-core/fsm-core.module';
import { FsmDrawModule } from './fsm/fsm-draw/fsm-draw.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FsmpageComponent } from './pages/fsmpage/fsmpage.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    FsmpageComponent,
    HeaderMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FsmCoreModule,
    FsmDrawModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
