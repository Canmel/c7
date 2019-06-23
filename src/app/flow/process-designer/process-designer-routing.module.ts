import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcessDesignerComponent} from './process-designer.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessDesignerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessDesignerRoutingModule { }
