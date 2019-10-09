import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectGroupRoutingModule } from './project-group-routing.module';
import { ProjectGroupComponent } from './project-group.component';
import { ProjectGroupAddComponent } from './project-group-add/project-group-add.component';
import { ProjectGroupEditComponent } from './project-group-edit/project-group-edit.component';

@NgModule({
  declarations: [ProjectGroupComponent, ProjectGroupAddComponent, ProjectGroupEditComponent],
  imports: [
    CommonModule,
    ProjectGroupRoutingModule
  ]
})
export class ProjectGroupModule { }
