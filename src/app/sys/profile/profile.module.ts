import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';

@NgModule({
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgZorroAntdModule,
    CrumbsModule
  ]
})
export class ProfileModule {
}
