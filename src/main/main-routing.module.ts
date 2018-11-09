import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {HomeComponent} from '../app/sys/home/home.component';
import {UsersComponent} from '../app/sys/users/users.component';
import {UsersModule} from '../app/sys/users/users.module';
import {RolesModule} from '../app/sys/roles/roles.module';
import {MenusModule} from '../app/sys/menus/menus.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadChildren: () => UsersModule
      }, {
        path: 'roles',
        loadChildren: () => RolesModule
      }, {
        path: 'menus',
        loadChildren: () => MenusModule
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
