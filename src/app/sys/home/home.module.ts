import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CrumbsModule,
    HomeRoutingModule

  ]
})
export class HomeModule {
}
