import { NgModule } from '@angular/core';
import { ErrandDocComponent } from './errand-doc/errand-doc.component';
import { ErrandExpenseComponent } from './errand-expense/errand-expense.component';
import { TripsExpenseComponent } from './trips-expense/trips-expense.component';
import {CommonModule} from '@angular/common';
import {EssenceNg2PrintModule} from 'essence-ng2-print';
import { ErrandSubsidyComponent } from './errand-subsidy/errand-subsidy.component';

@NgModule({
  declarations: [ErrandDocComponent, ErrandExpenseComponent, TripsExpenseComponent, ErrandSubsidyComponent],
  imports: [
    CommonModule,
    EssenceNg2PrintModule
  ],
  exports: [ErrandExpenseComponent, ErrandDocComponent, TripsExpenseComponent, ErrandSubsidyComponent]
})
export class CommonsModule { }
