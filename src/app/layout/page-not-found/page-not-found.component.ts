import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Urls} from '../../../public/url';

declare var StarField: any;

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    new StarField('fullScreen').render(333, 3);
  }

  returnToHome() {
    this.router.navigate([Urls.SESSION.APP]);
  }

}
