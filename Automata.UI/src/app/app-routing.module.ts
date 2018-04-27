import { FsmpageComponent } from './pages/fsmpage/fsmpage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'fsm', pathMatch: 'full' },
  { path: 'fsm', component: FsmpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
