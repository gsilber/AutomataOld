import { FsmModule } from './fsm/fsm.module';
import { HeaderMenuModule } from './reusable/header-menu/header-menu.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FsmPageComponent } from './pages/fsm-page/fsm-page.component';
import { PdaPageComponent } from './pages/pda-page/pda-page.component';
import { TuringPageComponent } from './pages/turing-page/turing-page.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    FsmPageComponent,
    PdaPageComponent,
    TuringPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    HeaderMenuModule,
    FsmModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
