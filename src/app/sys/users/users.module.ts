import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserAddComponent} from './user-add/user-add.component';
import {ListDirective} from '../../../public/list/list.directive';
import {ListModule} from '../../../public/list/list.module';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
registerLocaleData(zh);

@NgModule({
  declarations: [
    UsersComponent,
    UserEditComponent,
    UserAddComponent,
    ListDirective
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    BailyTableModule,
    CrumbsModule,
    PaginationModule,
    ListModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  bootstrap: [ UsersComponent ],
  providers   : [ { provide: NZ_I18N, useValue: zh_CN } ]
})
export class UsersModule {
}
