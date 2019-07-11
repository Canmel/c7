import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcessDesignerComponent} from './process-designer.component';
import {ProcessDesignerEditComponent} from './process-designer-edit/process-designer-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessDesignerComponent
  },
  {
    path: 'edit',
    component: ProcessDesignerEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessDesignerRoutingModule { }
