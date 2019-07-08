import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-errand-add',
  templateUrl: './errand-add.component.html',
  styleUrls: ['./errand-add.component.css']
})
export class ErrandAddComponent implements OnInit {

  crumbs = {
    title: '出差管理',
    subTitle: '新建出差'
  };

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, public router: Router, public https: HttpsUtils, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  /**
   * 方法用途: 重置表单
   * 参数:  事件
   **/
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (key) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

}
