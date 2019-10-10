import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocumentComponent} from './document.component';
import {DocumentEditComponent} from './document-edit/document-edit.component';
import {DocumentAddComponent} from './document-add/document-add.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentComponent
  }, {
    path: 'edit',
    component: DocumentEditComponent
  }, {
    path: 'add',
    component: DocumentAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
