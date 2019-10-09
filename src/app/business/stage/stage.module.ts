import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StageRoutingModule} from './stage-routing.module';
import {StageComponent} from './stage.component';
import {StageAddComponent} from './stage-add/stage-add.component';
import {StageEditComponent} from './stage-edit/stage-edit.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NzSelectModule} from 'ng-zorro-antd';
import {DatetimeModule} from '../../pipe/datetime.module';

@NgModule({
  declarations: [StageComponent, StageAddComponent, StageEditComponent],
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
    StageRoutingModule
  ]
})
export class StageModule {
}
