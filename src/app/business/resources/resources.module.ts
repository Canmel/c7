import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesComponent } from './resources.component';
import { ResourcesAddComponent } from './resources-add/resources-add.component';
import { ResourcesEditComponent } from './resources-edit/resources-edit.component';

@NgModule({
  declarations: [ResourcesComponent, ResourcesAddComponent, ResourcesEditComponent],
  imports: [
    CommonModule,
    ResourcesRoutingModule
  ]
})
export class ResourcesModule { }
