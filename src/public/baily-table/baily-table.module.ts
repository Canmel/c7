import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BailyTableComponent} from './baily-table.component';

@NgModule({
  declarations: [
    BailyTableComponent
  ],
  exports: [
    BailyTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BailyTableModule {
}
