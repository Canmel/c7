import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectComponent} from './project.component';
import {ProjectAddComponent} from './project-add/project-add.component';
import {ProjectEditComponent} from './project-edit/project-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent
  }, {
    path: 'add',
    component: ProjectAddComponent
  }, {
    path: 'edit',
    component: ProjectEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
