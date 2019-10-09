import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryRoutingModule } from './industry-routing.module';
import { IndustryComponent } from './industry.component';
import { IndustryAddComponent } from './industry-add/industry-add.component';
import { IndustryEditComponent } from './industry-edit/industry-edit.component';

@NgModule({
  declarations: [IndustryComponent, IndustryAddComponent, IndustryEditComponent],
  imports: [
    CommonModule,
    IndustryRoutingModule
  ]
})
export class IndustryModule { }
