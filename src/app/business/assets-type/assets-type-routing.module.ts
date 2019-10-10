import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AssetsTypeComponent} from './assets-type.component';
import {AssetsTypeAddComponent} from './assets-type-add/assets-type-add.component';
import {AssetsTypeEditComponent} from './assets-type-edit/assets-type-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AssetsTypeComponent
  }, {
    path: 'add',
    component: AssetsTypeAddComponent
  }, {
    path: 'edit',
    component: AssetsTypeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsTypeRoutingModule { }
