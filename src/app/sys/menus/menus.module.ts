import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MenusRoutingModule} from './menus-routing.module';
import {MenusComponent} from './menus.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, NzSelectModule, zh_CN} from 'ng-zorro-antd';
import {MenuEditComponent} from './menu-edit/menu-edit.component';
import {MenuAddComponent} from './menu-add/menu-add.component';
import {HttpsUtils} from '../../utils/HttpsUtils.service';

@NgModule({
  declarations: [
    MenusComponent,
    MenuEditComponent,
    MenuAddComponent
  ],
  imports: [
    CommonModule,
    CrumbsModule,
    FormsModule,
    MenusRoutingModule,
    BailyTableModule,
    PaginationModule,
    ListModule,
    NzSelectModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  bootstrap: [MenusComponent],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class MenusModule { }
