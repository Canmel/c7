import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZsProjectRoutingModule } from './zs-project-routing.module';
import { ZsProjectComponent } from './zs-project.component';
import {DemoRoutingModule} from '../demo/demo-routing.module';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NzSelectModule} from 'ng-zorro-antd';
import {DatetimeModule} from '../../pipe/datetime.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ZsProjectComponent, AddComponent, EditComponent],
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
    ZsProjectRoutingModule
  ]
})
export class ZsProjectModule { }
