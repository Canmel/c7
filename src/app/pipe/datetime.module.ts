import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatetimePipe} from './datetime.pipe';
import { ChmPipe } from './chm.pipe';

@NgModule({
  declarations: [DatetimePipe, ChmPipe],
  imports: [
    CommonModule
  ],
  exports: [DatetimePipe]
})
export class DatetimeModule {
  static forRoot() {
    return {
      ngModule: DatetimeModule,
      providers: []
    };
  }
}
