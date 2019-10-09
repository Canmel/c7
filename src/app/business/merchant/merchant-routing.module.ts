import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MerchantComponent} from './merchant.component';
import {MerchantAddComponent} from './merchant-add/merchant-add.component';
import {MerchantEditComponent} from './merchant-edit/merchant-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MerchantComponent
  }, {
    path: 'add',
    component: MerchantAddComponent
  }, {
    path: 'edit',
    component: MerchantEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {
}
