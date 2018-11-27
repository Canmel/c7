import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkFlowComponent} from './work-flow.component';

const routes: Routes = [
  {
    path: '',
    component: WorkFlowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkFlowRoutingModule { }
