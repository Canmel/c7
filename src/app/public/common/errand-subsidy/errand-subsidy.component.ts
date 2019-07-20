import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-errand-subsidy',
  templateUrl: './errand-subsidy.component.html',
  styleUrls: ['./errand-subsidy.component.css']
})
export class ErrandSubsidyComponent implements OnInit {

  @Input() selected;

  @Input() route;

  constructor() {
  }

  ngOnInit() {
  }
}
