import { NgModule } from '@angular/core';
import { ErrandDocComponent } from './errand-doc/errand-doc.component';
import { ErrandExpenseComponent } from './errand-expense/errand-expense.component';
import { TripsExpenseComponent } from './trips-expense/trips-expense.component';

@NgModule({
  declarations: [ErrandDocComponent, ErrandExpenseComponent, TripsExpenseComponent],
  imports: [
  ]
})
export class CommonsModule { }
