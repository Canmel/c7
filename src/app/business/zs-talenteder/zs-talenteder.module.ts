import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZsTalentederRoutingModule } from './zs-talenteder-routing.module';
import { ZsTalentederComponent } from './zs-talenteder.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ZsTalentederComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    ZsTalentederRoutingModule
  ]
})
export class ZsTalentederModule { }
