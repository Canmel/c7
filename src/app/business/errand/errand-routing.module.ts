import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrandComponent} from './errand.component';
import {ErrandAddComponent} from './errand-add/errand-add.component';
import {ErrandEditComponent} from './errand-edit/errand-edit.component';
import {ErrandCompleteComponent} from './errand-complete/errand-complete.component';

const routes: Routes = [
  {
    path: '',
    component: ErrandComponent
  }, {
    path: 'add',
    component: ErrandAddComponent
  }, {
    path: 'edit',
    component: ErrandEditComponent
  }, {
    path: 'complete',
    component: ErrandCompleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrandRoutingModule {
}
