import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectMonitorRoutingModule} from './project-monitor-routing.module';
import {ProjectMonitorComponent} from './project-monitor.component';
import {ProjectMonitorEditComponent} from './project-monitor-edit/project-monitor-edit.component';
import {ProjectMonitorAddComponent} from './project-monitor-add/project-monitor-add.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, NzSelectModule, zh_CN} from 'ng-zorro-antd';
import {DatetimeModule} from '../../pipe/datetime.module';
import {HttpsUtils} from '../../utils/HttpsUtils.service';

@NgModule({
  declarations: [ProjectMonitorComponent, ProjectMonitorEditComponent, ProjectMonitorAddComponent],
  imports: [
    CommonModule,
    CrumbsModule,
    BailyTableModule,
    PaginationModule,
    ListModule,
    FormsModule,
    NzSelectModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DatetimeModule.forRoot(),
    ProjectMonitorRoutingModule
  ],
  bootstrap: [ProjectMonitorComponent],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class ProjectMonitorModule {
}
