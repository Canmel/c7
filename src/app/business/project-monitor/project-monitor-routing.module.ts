import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectMonitorComponent} from './project-monitor.component';
import {ProjectMonitorEditComponent} from './project-monitor-edit/project-monitor-edit.component';
import {ProjectMonitorAddComponent} from './project-monitor-add/project-monitor-add.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectMonitorComponent
  },
  {
    path: 'edit',
    component: ProjectMonitorEditComponent
  },
  {
    path: 'add',
    component: ProjectMonitorAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectMonitorRoutingModule { }
