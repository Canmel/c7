import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnAuthenticationComponent} from './un-authentication.component';

const routes: Routes = [
  {
    path: '',
    component: UnAuthenticationComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnAuthenticationRoutingModule {

}
