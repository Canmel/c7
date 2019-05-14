import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MacrosRoutingModule } from './macros-routing.module';
import { MacrosComponent } from './macros.component';
import { MacroEditComponent } from './macro-edit/macro-edit.component';

@NgModule({
  declarations: [MacrosComponent, MacroEditComponent],
  imports: [
    CommonModule,
    MacrosRoutingModule
  ]
})
export class MacrosModule { }
