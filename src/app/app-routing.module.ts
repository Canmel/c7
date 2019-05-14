import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './layout/page-not-found/page-not-found.component';
import {LoginModule} from '../login/login.module';
import {MainModule} from '../main/main.module';
import {UnAuthenticationModule} from './layout/un-authentication/un-authentication.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => LoginModule
  },
  {
    path: 'app',
    loadChildren: () => MainModule
  },
  {
    path: 'unauthentication',
    loadChildren: () => UnAuthenticationModule
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
