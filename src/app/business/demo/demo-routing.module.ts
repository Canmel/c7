import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DemoComponent} from './demo.component';
import {DemoAddComponent} from './demo-add/demo-add.component';
import {DemoEditComponent} from './demo-edit/demo-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent
  },
  {
    path: 'add',
    component: DemoAddComponent
  },
  {
    path: 'edit',
    component: DemoEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
