import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Properties} from '../public/properties';
import {Urls} from '../public/url';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private location: PlatformLocation) {
  }


  ngOnInit(): void {
  }
}
