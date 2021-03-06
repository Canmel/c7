import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ZsGroundRoutingModule} from './zs-ground-routing.module';
import {ZsGroundComponent} from './zs-ground.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NzSelectModule} from 'ng-zorro-antd';
import {DatetimeModule} from '../../pipe/datetime.module';

@NgModule({
  declarations: [ZsGroundComponent, AddComponent, EditComponent],
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
    ZsGroundRoutingModule
  ]
})
export class ZsGroundModule {
}
