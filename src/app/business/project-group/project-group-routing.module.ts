import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectGroupComponent} from './project-group.component';
import {ProjectGroupAddComponent} from './project-group-add/project-group-add.component';
import {ProjectGroupEditComponent} from './project-group-edit/project-group-edit.component';
import {AddQuestionComponent} from './add-question/add-question.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectGroupComponent
  },
  {
    path: 'add',
    component: ProjectGroupAddComponent
  },
  {
    path: 'edit',
    component: ProjectGroupEditComponent
  },
  {
    path: 'question',
    component: AddQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectGroupRoutingModule {
}
