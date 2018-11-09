import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import {MenusComponent} from './menus.component';

@NgModule({
  declarations: [
    MenusComponent
  ],
  imports: [
    CommonModule,
    MenusRoutingModule
  ]
})
export class MenusModule { }
