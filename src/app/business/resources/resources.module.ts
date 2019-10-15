import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResourcesRoutingModule} from './resources-routing.module';
import {ResourcesComponent} from './resources.component';
import {ResourcesAddComponent} from './resources-add/resources-add.component';
import {ResourcesEditComponent} from './resources-edit/resources-edit.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, NzSelectModule, NzTagModule, zh_CN} from 'ng-zorro-antd';
import {DatetimeModule} from '../../pipe/datetime.module';
import {HttpsUtils} from '../../utils/HttpsUtils.service';

@NgModule({
  declarations: [ResourcesComponent, ResourcesAddComponent, ResourcesEditComponent],
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
    NzTagModule,
    DatetimeModule.forRoot(),
    ResourcesRoutingModule
  ],
  bootstrap: [ResourcesComponent],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class ResourcesModule {
}
