import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkFlowRoutingModule } from './work-flow-routing.module';
import { WorkFlowComponent } from './work-flow.component';
import { WorkFlowAddComponent } from './work-flow-add/work-flow-add.component';
import {WorkFlowEditComponent} from './work-flow-edit/work-flow-edit.component';

@NgModule({
  declarations: [WorkFlowComponent, WorkFlowAddComponent, WorkFlowEditComponent],
  imports: [
    CommonModule,
    WorkFlowRoutingModule
  ]
})
export class WorkFlowModule { }
