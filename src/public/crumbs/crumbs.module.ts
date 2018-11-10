import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrumbsComponent} from './crumbs.component';

@NgModule({
  declarations: [
    CrumbsComponent
  ],
  exports: [CrumbsComponent],
  imports: [
    CommonModule
  ]
})
export class CrumbsModule {
}
