import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IndustryRoutingModule} from './industry-routing.module';
import {IndustryComponent} from './industry.component';
import {IndustryAddComponent} from './industry-add/industry-add.component';
import {IndustryEditComponent} from './industry-edit/industry-edit.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, NzSelectModule, zh_CN} from 'ng-zorro-antd';
import {DatetimeModule} from '../../pipe/datetime.module';
import {HttpsUtils} from '../../utils/HttpsUtils.service';

@NgModule({
  declarations: [IndustryComponent, IndustryAddComponent, IndustryEditComponent],
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
    IndustryRoutingModule
  ],
  bootstrap: [IndustryComponent],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class IndustryModule {
}
