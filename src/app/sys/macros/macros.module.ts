import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MacrosRoutingModule} from './macros-routing.module';
import {MacrosComponent} from './macros.component';
import {MacroEditComponent} from './macro-edit/macro-edit.component';
import {MacroAddComponent} from './macro-add/macro-add.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';

@NgModule({
  declarations: [MacrosComponent, MacroEditComponent, MacroAddComponent],
  imports: [
    CommonModule,
    MacrosRoutingModule,
    CrumbsModule,
    FormsModule,
    BailyTableModule,
    PaginationModule,
    ListModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class MacrosModule { }
