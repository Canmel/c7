import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReimbursementComponent} from './reimbursement.component';
import {ReimbursementRoutingModule} from './reimbursement-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {NgZorroAntdModule, NzInputNumberModule} from 'ng-zorro-antd';
import {ReimbursementAddComponent} from '../reimbursement-add/reimbursement-add.component';
import {ReimbursementEditComponent} from '../reimbursement-edit/reimbursement-edit.component';

@NgModule({
  declarations: [
    ReimbursementComponent,
    ReimbursementAddComponent,
    ReimbursementEditComponent
  ],
  imports: [
    CommonModule,
    ReimbursementRoutingModule,
    FormsModule,
    BailyTableModule,
    CrumbsModule,
    PaginationModule,
    ListModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ]
})
export class ReimbursementModule {
}
