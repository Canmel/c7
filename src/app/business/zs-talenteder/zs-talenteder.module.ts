import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZsTalentederRoutingModule } from './zs-talenteder-routing.module';
import { ZsTalentederComponent } from './zs-talenteder.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NzCommentModule, NzInputNumberModule, NzSelectModule} from 'ng-zorro-antd';
import {DatetimeModule} from '../../pipe/datetime.module';

@NgModule({
  declarations: [ZsTalentederComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    CrumbsModule,
    BailyTableModule,
    PaginationModule,
    ListModule,
    FormsModule,
    NzCommentModule,
    NzSelectModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DatetimeModule.forRoot(),
    NzInputNumberModule,
    ZsTalentederRoutingModule
  ]
})
export class ZsTalentederModule { }
