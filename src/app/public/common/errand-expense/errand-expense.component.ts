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

  @Input() traffic;

  subtotalValue = {
    trip: 0
  };

  trafficAmountValue = 0;

  constructor() {
  }

  ngOnInit() {
    this.subtotal();
    this.trafficAmount();
  }

  subtotal(): any {
    let trip = 0;
    if (this.trips) {
      this.trips.forEach(function (item) {
        trip = trip + item['amount'];
      });
    }
    if (trip !== undefined) {
      this.subtotalValue.trip = trip;
    }
    return this.subtotalValue;
  }

  amount() {
    return this.subtotal().trip + this.other() + this.trafficAmount();
  }

  other() {
    if (this.route && this.route.days) {
      return 60 * this.route.days;
    }
    return 0;
  }

  trafficAmount() {
    let m = 0;
    this.traffic.forEach(function (item) {
      m += item.amount;
    });
    return m;
  }
}
