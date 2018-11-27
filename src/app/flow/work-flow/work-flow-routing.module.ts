import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WorkFlowComponent} from './work-flow.component';
import {WorkFlowAddComponent} from './work-flow-add/work-flow-add.component';
import {WorkFlowEditComponent} from './work-flow-edit/work-flow-edit.component';

const routes: Routes = [
  {
    path: '',
    component: WorkFlowComponent
  }, {
    path: 'add',
    component: WorkFlowAddComponent
  }, {
    path: 'edit',
    component: WorkFlowEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkFlowRoutingModule {
}
