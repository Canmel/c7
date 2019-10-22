import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectGroupComponent} from './project-group.component';
import {ProjectGroupAddComponent} from './project-group-add/project-group-add.component';
import {ProjectGroupEditComponent} from './project-group-edit/project-group-edit.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, NzGridModule, NzIconModule, NzSelectModule, NzTabsModule, zh_CN} from 'ng-zorro-antd';
import {DatetimeModule} from '../../pipe/datetime.module';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {ProjectGroupRoutingModule} from './project-group-routing.module';
import { AddQuestionComponent } from './add-question/add-question.component';

@NgModule({
  declarations: [ProjectGroupComponent, ProjectGroupAddComponent, ProjectGroupEditComponent, AddQuestionComponent],
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
    NzTabsModule,
    NzIconModule,
    NzGridModule,
    NzSelectModule,
    DatetimeModule.forRoot(),
    ProjectGroupRoutingModule
  ],
  bootstrap: [ProjectGroupComponent],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class ProjectGroupModule {
}
