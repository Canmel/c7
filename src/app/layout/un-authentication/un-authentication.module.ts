import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UnAuthenticationRoutingModule} from './un-authentication-routing.module';
import {UnAuthenticationComponent} from './un-authentication.component';

@NgModule({
  declarations: [UnAuthenticationComponent],
  imports: [
    CommonModule,
    UnAuthenticationRoutingModule
  ]
})
export class UnAuthenticationModule { }
