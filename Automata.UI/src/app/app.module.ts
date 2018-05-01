import { FsmCoreModule } from './fsm/fsm-core/fsm-core.module';
import { FsmDrawModule } from './fsm/fsm-draw/fsm-draw.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FsmpageComponent } from './pages/fsmpage/fsmpage.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { PdapageComponent } from './pages/pdapage/pdapage.component';
import { TuringpageComponent } from './pages/turingpage/turingpage.component';
import { FsmExamplesComponent } from './pages/fsmpage/components/fsm-examples/fsm-examples.component';
import { FsmNonDetermInfoComponent } from './pages/fsmpage/components/fsm-non-determ-info/fsm-non-determ-info.component';
import { FsmInfoComponent } from './pages/fsmpage/components/fsm-info/fsm-info.component';
import { FsmSimComponent } from './pages/fsmpage/components/fsm-sim/fsm-sim.component';


@NgModule({
  declarations: [
    AppComponent,
    FsmpageComponent,
    HeaderMenuComponent,
    PdapageComponent,
    TuringpageComponent,
    FsmExamplesComponent,
    FsmNonDetermInfoComponent,
    FsmInfoComponent,
    FsmSimComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FsmDrawModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
