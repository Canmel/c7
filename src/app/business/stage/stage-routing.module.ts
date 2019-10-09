import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StageComponent} from './stage.component';
import {StageEditComponent} from './stage-edit/stage-edit.component';
import {StageAddComponent} from './stage-add/stage-add.component';

const routes: Routes = [
  {
    path: '',
    component: StageComponent
  }, {
    path: 'edit',
    component: StageEditComponent
  }, {
    path: 'add',
    component: StageAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StageRoutingModule {
}
