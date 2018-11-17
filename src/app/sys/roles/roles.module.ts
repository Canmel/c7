import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RolesRoutingModule} from './roles-routing.module';
import {RolesComponent} from './roles.component';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {RoleEditComponent} from './role-edit/role-edit.component';
import {RoleAddComponent} from './role-add/role-add.component';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';

@NgModule({
  declarations: [
    RolesComponent,
    RoleEditComponent,
    RoleAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RolesRoutingModule,
    BailyTableModule,
    CrumbsModule,
    PaginationModule,
    ListModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  bootstrap: [RolesComponent],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class RolesModule {
}
