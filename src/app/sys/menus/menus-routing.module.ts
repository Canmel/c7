import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenusComponent} from './menus.component';
import {MenuEditComponent} from './menu-edit/menu-edit.component';
import {MenuAddComponent} from './menu-add/menu-add.component';

const routes: Routes = [
  {
    path: '',
    component: MenusComponent
  }, {
    path: 'edit',
    component: MenuEditComponent
  }, {
    path: 'add',
    component: MenuAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule {
}
