import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MacrosComponent} from './macros.component';
import {MacroEditComponent} from './macro-edit/macro-edit.component';
import {MacroAddComponent} from './macro-add/macro-add.component';

const routes: Routes = [
  {
    path: '',
    component: MacrosComponent
  }, {
    path: 'edit',
    component: MacroEditComponent
  }, {
    path: 'add',
    component: MacroAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MacrosRoutingModule { }
