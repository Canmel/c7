import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-trips-expense',
  templateUrl: './trips-expense.component.html',
  styleUrls: ['./trips-expense.component.css']
})
export class TripsExpenseComponent implements OnInit {

  @Input() selected;

  constructor() { }

  ngOnInit() {
  }

}
