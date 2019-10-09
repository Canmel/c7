import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantComponent } from './merchant.component';
import { MerchantEditComponent } from './merchant-edit/merchant-edit.component';
import { MerchantAddComponent } from './merchant-add/merchant-add.component';

@NgModule({
  declarations: [MerchantComponent, MerchantEditComponent, MerchantAddComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule
  ]
})
export class MerchantModule { }
