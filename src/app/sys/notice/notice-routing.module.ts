import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NoticeComponent} from './notice.component';
import {NoticeEditComponent} from './notice-edit/notice-edit.component';
import {NoticeAddComponent} from './notice-add/notice-add.component';

const routes: Routes = [
  {
    path: '',
    component: NoticeComponent
  }, {
    path: 'edit',
    component: NoticeEditComponent
  }, {
    path: 'add',
    component: NoticeAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeRoutingModule {
}
