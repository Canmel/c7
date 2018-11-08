import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/app',
  pathMatch: 'full'
},
  {
    path: 'login',
    loadChildren: 'src/login/login.module#LoginModule'
  },
  {
    path: 'app',
    loadChildren: 'src/main/main.module#MainModule'
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
