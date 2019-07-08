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
import {MacrosModule} from '../app/sys/macros/macros.module';
import {ProcessDesignerModule} from '../app/flow/process-designer/process-designer.module';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {ErrandModule} from '../app/business/errand/errand.module';

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
      }, {
        path: 'process-designer',
        loadChildren: () => ProcessDesignerModule
      }, {
        path: 'errand',
        loadChildren: () => ErrandModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
})
export class MainRoutingModule {
}
