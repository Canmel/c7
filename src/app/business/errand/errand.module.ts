import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ErrandRoutingModule} from './errand-routing.module';
import {ErrandComponent} from './errand.component';
import {ErrandEditComponent} from './errand-edit/errand-edit.component';
import {ErrandAddComponent} from './errand-add/errand-add.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {
  NgZorroAntdModule,
  NzCalendarModule,
  NzDividerModule,
  NzGridModule,
  NzInputNumberModule,
  NzListModule,
  NzRadioModule
} from 'ng-zorro-antd';
import {EssenceNg2PrintModule} from 'essence-ng2-print';
import {ErrandCompleteComponent} from './errand-complete/errand-complete.component';
import {CommonsModule} from '../../public/common/commons.module';

@NgModule({
  declarations: [ErrandComponent, ErrandEditComponent, ErrandAddComponent, ErrandCompleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    BailyTableModule,
    CrumbsModule,
    PaginationModule,
    ListModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ErrandRoutingModule,
    NzCalendarModule,
    NzRadioModule,
    EssenceNg2PrintModule,
    NzDividerModule,
    NzGridModule,
    NzInputNumberModule,
    NzListModule,
    CommonsModule
  ]
})
export class ErrandModule {
}
