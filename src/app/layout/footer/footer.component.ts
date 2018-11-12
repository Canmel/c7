import { Component, OnInit } from '@angular/core';
import {MainComponent} from '../../../main/main.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends MainComponent implements OnInit {


  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {
  }

}
