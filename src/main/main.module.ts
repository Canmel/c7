import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {HeaderComponent} from '../app/layout/header/header.component';
import {LefterComponent} from '../app/layout/lefter/lefter.component';
import {FooterComponent} from '../app/layout/footer/footer.component';
import {ContentFooterComponent} from '../app/layout/content-footer/content-footer.component';
import {MenuTreeComponent} from '../public/menu-tree/menu-tree.component';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    LefterComponent,
    FooterComponent,
    MenuTreeComponent,
    ContentFooterComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule {
}
