import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ZsGroupComponent} from './zs-group.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: ZsGroupComponent
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
export class ZsGroupRoutingModule { }
