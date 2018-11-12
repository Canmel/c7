import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserEditComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    BailyTableModule,
    CrumbsModule,
    PaginationModule
  ]
})
export class UsersModule {
}
