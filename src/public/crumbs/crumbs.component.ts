import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-crumbs',
  templateUrl: './crumbs.component.html',
  styleUrls: ['./crumbs.component.css']
})
export class CrumbsComponent implements OnInit {

  @Input() title: string;

  @Input() subTitle: string;

  constructor() {
  }

  ngOnInit() {
  }

}
