import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './users.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserAddComponent} from './user-add/user-add.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }, {
    path: 'edit',
    component: UserEditComponent
  }, {
    path: 'add',
    component: UserAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
