import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RolesComponent} from './roles.component';
import {RoleEditComponent} from './role-edit/role-edit.component';
import {RoleAddComponent} from './role-add/role-add.component';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent
  }, {
    path: 'edit',
    component: RoleEditComponent
  }, {
    path: 'add',
    component: RoleAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class RolesRoutingModule {
}
