import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {HeaderComponent} from '../app/layout/header/header.component';
import {LefterComponent} from '../app/layout/lefter/lefter.component';
import {FooterComponent} from '../app/layout/footer/footer.component';
import {ContentFooterComponent} from '../app/layout/content-footer/content-footer.component';
import {HomeComponent} from '../app/sys/home/home.component';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    LefterComponent,
    FooterComponent,
    ContentFooterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule {
}
