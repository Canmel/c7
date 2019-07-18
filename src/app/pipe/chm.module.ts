import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChmPipe} from './chm.pipe';

@NgModule({
  declarations: [ChmPipe],
  imports: [
    CommonModule
  ],
  exports: [ChmPipe]
})
export class ChmModule {
  static forRoot() {
    return {
      ngModule: ChmModule,
      providers: []
    };
  }
}
