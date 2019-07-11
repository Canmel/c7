import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {EssenceNg2PrintModule} from 'essence-ng2-print';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CrumbsModule,
    HomeRoutingModule,
    EssenceNg2PrintModule
  ]
})
export class HomeModule {
}
