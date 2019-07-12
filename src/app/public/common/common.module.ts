import { NgModule } from '@angular/core';
import { ErrandDocComponent } from './errand-doc/errand-doc.component';
import { ErrandExpenseComponent } from './errand-expense/errand-expense.component';

@NgModule({
  declarations: [ErrandDocComponent, ErrandExpenseComponent],
  imports: [
    CommonModule
  ]
})
export class CommonModule { }
