import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {ReimbursementComponent} from './reimbursement.component';
import {ReimbursementEditComponent} from './reimbursement-edit/reimbursement-edit.component';
import {ReimbursementAddComponent} from './reimbursement-add/reimbursement-add.component';

const routes: Routes = [
  {
    path: '',
    component: ReimbursementComponent
  }, {
    path: 'edit',
    component: ReimbursementEditComponent
  }, {
    path: 'add',
    component: ReimbursementAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class ReimbursementRoutingModule {
}
