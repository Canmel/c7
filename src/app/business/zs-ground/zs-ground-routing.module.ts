import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ZsGroundComponent} from './zs-ground.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: ZsGroundComponent
  }, {
    path: 'add',
    component: AddComponent
  }, {
    path: 'edit',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZsGroundRoutingModule {
}
