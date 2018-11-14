import {Component, OnInit} from '@angular/core';
import {MainComponent} from '../../../main/main.component';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends MainComponent implements OnInit {

  constructor(router: Router, http: HttpsUtils) {
    super(router, http);
  }

  ngOnInit() {
  }

}
