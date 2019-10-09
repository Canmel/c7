import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndustryComponent} from './industry.component';
import {IndustryEditComponent} from './industry-edit/industry-edit.component';
import {IndustryAddComponent} from './industry-add/industry-add.component';

const routes: Routes = [
  {
    path: '',
    component: IndustryComponent
  }, {
    path: 'edit',
    component: IndustryEditComponent
  }, {
    path: 'add',
    component: IndustryAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryRoutingModule { }
