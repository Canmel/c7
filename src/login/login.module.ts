import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpsUtils} from '../app/utils/HttpsUtils.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpClientModule
  ],
  providers: [HttpsUtils]
})
export class LoginModule { }
