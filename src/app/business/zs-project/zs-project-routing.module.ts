import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ZsProjectComponent} from './zs-project.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: ZsProjectComponent
  }, {
    path: 'add',
    component: AddComponent
  }, {
    path: 'edit',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZsProjectRoutingModule { }
