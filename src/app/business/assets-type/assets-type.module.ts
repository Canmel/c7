import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AssetsTypeRoutingModule} from './assets-type-routing.module';
import {AssetsTypeComponent} from './assets-type.component';
import {AssetsTypeAddComponent} from './assets-type-add/assets-type-add.component';
import {AssetsTypeEditComponent} from './assets-type-edit/assets-type-edit.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, NzSelectModule, zh_CN} from 'ng-zorro-antd';
import {DatetimeModule} from '../../pipe/datetime.module';
import {HttpsUtils} from '../../utils/HttpsUtils.service';

@NgModule({
  declarations: [AssetsTypeComponent, AssetsTypeAddComponent, AssetsTypeEditComponent],
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
    AssetsTypeRoutingModule
  ],
  bootstrap: [AssetsTypeComponent],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class AssetsTypeModule {
}
