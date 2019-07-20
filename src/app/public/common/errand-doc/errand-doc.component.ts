import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-errand-doc',
  templateUrl: './errand-doc.component.html',
  styleUrls: ['./errand-doc.component.css']
})
export class ErrandDocComponent implements OnInit {

  @Input() selected;

  constructor() {
  }

  ngOnInit() {
  }
}
