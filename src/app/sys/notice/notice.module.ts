import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeRoutingModule } from './notice-routing.module';
import { NoticeComponent } from './notice.component';
import { NoticeAddComponent } from './notice-add/notice-add.component';
import { NoticeEditComponent } from './notice-edit/notice-edit.component';

@NgModule({
  declarations: [NoticeComponent, NoticeAddComponent, NoticeEditComponent],
  imports: [
    CommonModule,
    NoticeRoutingModule
  ]
})
export class NoticeModule { }
