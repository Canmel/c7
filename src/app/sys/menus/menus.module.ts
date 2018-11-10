import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import {MenusComponent} from './menus.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';

@NgModule({
  declarations: [
    MenusComponent
  ],
  imports: [
    CommonModule,
    CrumbsModule,
    MenusRoutingModule
  ]
})
export class MenusModule { }
