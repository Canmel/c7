import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RolesRoutingModule} from './roles-routing.module';
import {RolesComponent} from './roles.component';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';

@NgModule({
  declarations: [
    RolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    BailyTableModule,
    CrumbsModule
  ]
})
export class RolesModule {
}
