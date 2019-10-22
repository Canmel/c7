import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ZsClueRoutingModule} from './zs-clue-routing.module';
import {ZsClueComponent} from './zs-clue.component';
import {AddComponent} from './add/add.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NzSelectModule} from 'ng-zorro-antd';
import {DatetimeModule} from '../../pipe/datetime.module';

@NgModule({
  declarations: [ZsClueComponent, AddComponent],
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
    ZsClueRoutingModule
  ]
})
export class ZsClueModule {
}
