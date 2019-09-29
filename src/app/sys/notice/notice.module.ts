import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeRoutingModule } from './notice-routing.module';
import { NoticeComponent } from './notice.component';
import { NoticeAddComponent } from './notice-add/notice-add.component';
import { NoticeEditComponent } from './notice-edit/notice-edit.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {NgZorroAntdModule, NzSelectModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [NoticeComponent, NoticeAddComponent, NoticeEditComponent],
  imports: [
    CommonModule,
    CrumbsModule,
    FormsModule,
    BailyTableModule,
    NoticeRoutingModule,
    PaginationModule,
    ListModule,
    NzSelectModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ]
})
export class NoticeModule { }
