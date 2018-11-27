import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkFlowRoutingModule } from './work-flow-routing.module';
import { WorkFlowComponent } from './work-flow.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {NgZorroAntdModule, NzTabsModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';

@NgModule({
  declarations: [WorkFlowComponent],
  imports: [
    CommonModule,
    CrumbsModule,
    NzTabsModule,
    FormsModule,
    PaginationModule,
    ListModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    WorkFlowRoutingModule
  ]
})
export class WorkFlowModule { }
