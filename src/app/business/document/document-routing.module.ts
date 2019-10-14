import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocumentComponent} from './document.component';
import {DocumentAddComponent} from './document-add/document-add.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentComponent
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
