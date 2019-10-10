import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResourcesComponent} from './resources.component';
import {ResourcesAddComponent} from './resources-add/resources-add.component';
import {ResourcesEditComponent} from './resources-edit/resources-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ResourcesComponent
  }, {
    path: 'add',
    component: ResourcesAddComponent
  }, {
    path: 'edit',
    component: ResourcesEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule {
}
