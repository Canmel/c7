import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {UsersModule} from '../app/sys/users/users.module';
import {RolesModule} from '../app/sys/roles/roles.module';
import {MenusModule} from '../app/sys/menus/menus.module';
import {HomeModule} from '../app/sys/home/home.module';
import {ProfileModule} from '../app/sys/profile/profile.module';
import {LogsModule} from '../app/sys/logs/logs.module';
import {WorkFlowModule} from '../app/flow/work-flow/work-flow.module';
import {ReimbursementModule} from '../app/business/reimbursement/reimbursement.module';
import {MacrosComponent} from '../app/sys/macros/macros.component';
import {MacrosModule} from '../app/sys/macros/macros.module';

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
        loadChildren: () => HomeModule
      }, {
        path: 'profile',
        loadChildren: () => ProfileModule
      }, {
        path: 'logs',
        loadChildren: () => LogsModule
      }, {
        path: 'workflows',
        loadChildren: () => WorkFlowModule
      }, {
        path: 'reimbursement',
        loadChildren: () => ReimbursementModule
      }, {
        path: 'macros',
        loadChildren: () => MacrosModule
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
