import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StageRoutingModule } from './stage-routing.module';
import { StageComponent } from './stage.component';
import { StageAddComponent } from './stage-add/stage-add.component';
import { StageEditComponent } from './stage-edit/stage-edit.component';

@NgModule({
  declarations: [StageComponent, StageAddComponent, StageEditComponent],
  imports: [
    CommonModule,
    StageRoutingModule
  ]
})
export class StageModule { }
