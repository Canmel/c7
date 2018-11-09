import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {HomeComponent} from '../app/sys/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'users',
        loadChildren: 'src/app/sys/users/users.module#UsersModule'
      }, {
        path: 'roles',
        loadChildren: 'src/app/sys/roles/roles.module#RolesModule'
      }, {
        path: 'menus',
        loadChildren: 'src/app/sys/menus/menus.module#MenusModule'
      }, {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
