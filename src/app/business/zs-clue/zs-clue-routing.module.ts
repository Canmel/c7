import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ZsClueComponent} from './zs-clue.component';
import {AddComponent} from './add/add.component';

const routes: Routes = [
  {path: '', component: ZsClueComponent},
  {path: 'add', component: AddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZsClueRoutingModule {
}
