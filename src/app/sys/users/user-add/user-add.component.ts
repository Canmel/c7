import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '用户管理',
    subTitle: '新建用户'
  };

  validateForm: FormGroup;

  /**
   * 方法用途: 提交表单
   * 参数: 事件， 表单值
   **/
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  };

  /**
   * 方法用途: 重置表单
   * 参数:  事件
   **/
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  /**
   * 方法用途: 验证确认密码
   * 参数: 无
   **/
  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  /**
   * 方法用途: 用户名称异步验证
   * 参数:
   **/
  userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    setTimeout(() => {
      if (control.value === 'JasonWood') {
        observer.next({error: true, duplicated: true});
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  })

  /**
   * 方法用途: 确认密码验证
   * 参数:
   **/
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
  }

  /**
   * 方法用途: 构造器构造验证对象
   * 参数:
   **/
  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^1[34578]\\d{9}$')]],
      comment: ['', [Validators.required]]
    });
    console.log(this.validateForm.get('phone'));
  }

  ngOnInit() {
  }

}
