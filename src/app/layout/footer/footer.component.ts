import {Component, OnInit} from '@angular/core';
import {MainComponent} from '../../../main/main.component';
import {Router} from '@angular/router';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends MainComponent implements OnInit {

  constructor(router: Router, http: HttpsUtils, cookies: CookieService) {
    super(router, http, cookies);
  }

  ngOnInit() {
  }

}
