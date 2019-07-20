import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-errand-expense',
  templateUrl: './errand-expense.component.html',
  styleUrls: ['./errand-expense.component.css']
})
export class ErrandExpenseComponent implements OnInit {

  @Input() selected;

  @Input() trips;

  @Input() route;

  subtotalValue = {
    trip: 0
  };

  constructor() {
  }

  ngOnInit() {
    this.subtotal();
  }

  subtotal(): any{
    const _this = this;
    let trip = 0;
    this.trips.forEach(function (item) {
      trip = trip + item['amount'];
    });
    this.subtotalValue.trip = trip;
    return this.subtotalValue;
  }
}
