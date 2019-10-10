import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {UsersModule} from '../app/sys/users/users.module';
import {RolesModule} from '../app/sys/roles/roles.module';
import {MenusModule} from '../app/sys/menus/menus.module';
import {HomeModule} from '../app/sys/home/home.module';
import {ProfileModule} from '../app/sys/profile/profile.module';
import {LogsModule} from '../app/sys/logs/logs.module';
import {ReimbursementModule} from '../app/business/reimbursement/reimbursement.module';
import {MacrosModule} from '../app/sys/macros/macros.module';
import {ProcessDesignerModule} from '../app/flow/process-designer/process-designer.module';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {ErrandModule} from '../app/business/errand/errand.module';
import {WorkFlowModule} from '../app/flow/work-flow/work-flow.module';
import {NoticeModule} from '../app/sys/notice/notice.module';
import {ProjectModule} from '../app/business/project/project.module';
import {DemoModule} from '../app/business/demo/demo.module';
import {ProjectGroupModule} from '../app/business/project-group/project-group.module';
import {StageModule} from '../app/business/stage/stage.module';
import {MerchantModule} from '../app/business/merchant/merchant.module';
import {IndustryModule} from '../app/business/industry/industry.module';
import {ResourcesModule} from '../app/business/resources/resources.module';
import {ProjectMonitorModule} from '../app/business/project-monitor/project-monitor.module';
import {AssetsTypeModule} from '../app/business/assets-type/assets-type.module';

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
        path: 'workflow',
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
      }, {
        path: 'notice',
        loadChildren: () => NoticeModule
      }, {
        path: 'project',
        loadChildren: () => ProjectModule
      }, {
        path: 'demo',
        loadChildren: () => DemoModule
      }, {
        path: 'project_group',
        loadChildren: () => ProjectGroupModule
      }, {
        path: 'stage',
        loadChildren: () => StageModule
      }, {
        path: 'merchant',
        loadChildren: () => MerchantModule
      }, {
        path: 'industry',
        loadChildren: () => IndustryModule
      }, {
        path: 'resources',
        loadChildren: () => ResourcesModule
      }, {
        path: 'monitor',
        loadChildren: () => ProjectMonitorModule
      }, {
        path: 'assets-type',
        loadChildren: () => AssetsTypeModule
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
