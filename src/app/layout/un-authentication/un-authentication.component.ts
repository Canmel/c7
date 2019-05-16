import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Urls} from '../../../public/url';

@Component({
  selector: 'app-un-authentication',
  templateUrl: './un-authentication.component.html',
  styleUrls: ['./un-authentication.component.css']
})
export class UnAuthenticationComponent implements OnInit {

  jumpTime: number;


  urlCollection = Urls;

  constructor(private router: Router) {
    this.jumpTime = 5;
  }

  ngOnInit() {
    this.countDdown();
  }

  countDdown() {
    const _this = this;
    setInterval(function () {
      _this.jumpTime--;
      if (_this.jumpTime === 0) {
        return location.href = Urls.SESSION.LOGIN;
      }
    }, 100000);
  }

}
