import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-footer',
  templateUrl: './content-footer.component.html',
  styleUrls: ['./content-footer.component.css']
})
export class ContentFooterComponent implements OnInit {

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  constructor() {
  }

  ngOnInit() {
  }


}
