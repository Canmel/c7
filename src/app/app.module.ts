import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './layout/page-not-found/page-not-found.component';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {HttpsUtils} from './utils/HttpsUtils.service';
import {CookieService} from 'ngx-cookie-service';
import { MacroAddComponent } from './sys/macros/macro-add/macro-add.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MacroAddComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgZorroAntdModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
