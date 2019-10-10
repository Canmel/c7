import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DemoRoutingModule} from './demo-routing.module';
import {DemoComponent} from './demo.component';
import {DemoAddComponent} from './demo-add/demo-add.component';
import {DemoEditComponent} from './demo-edit/demo-edit.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {NgZorroAntdModule, NZ_I18N, NzSelectModule, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatetimeModule} from '../../pipe/datetime.module';
import {HttpsUtils} from '../../utils/HttpsUtils.service';

@NgModule({
  declarations: [DemoComponent, DemoAddComponent, DemoEditComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    CrumbsModule,
    BailyTableModule,
    PaginationModule,
    ListModule,
    FormsModule,
    NzSelectModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DatetimeModule.forRoot()
  ],
  bootstrap: [DemoComponent],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class DemoModule {
}
