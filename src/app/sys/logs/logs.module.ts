import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {NgZorroAntdModule, NZ_I18N, NzSelectModule, zh_CN} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';

@NgModule({
  declarations: [LogsComponent],
  exports: [LogsComponent],
  imports: [
    CommonModule,
    CrumbsModule,
    FormsModule,
    LogsRoutingModule,
    BailyTableModule,
    PaginationModule,
    ListModule,
    NzSelectModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  bootstrap: [LogsComponent],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class LogsModule { }
