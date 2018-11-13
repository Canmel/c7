import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list.component';
import {NzPopoverModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [ListComponent],
  exports: [ListComponent],
  imports: [
    CommonModule,
    NzPopoverModule
  ]
})
export class ListModule {
}
