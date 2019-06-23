import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkFlowRoutingModule } from './work-flow-routing.module';
import { WorkFlowComponent } from './work-flow.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {NgZorroAntdModule, NZ_I18N, NzTabsModule, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import { WorkFlowAddComponent } from './work-flow-add/work-flow-add.component';
import { WorkFlowEditComponent } from './work-flow-edit/work-flow-edit.component';
import {HttpModule} from '@angular/http';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  declarations: [WorkFlowComponent, WorkFlowAddComponent, WorkFlowEditComponent],
  imports: [
    CommonModule,
    CrumbsModule,
    NzTabsModule,
    FormsModule,
    PaginationModule,
    ListModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpModule,
    WorkFlowRoutingModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}]
})
export class WorkFlowModule { }
