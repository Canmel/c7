import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Urls} from '../../public/url';
import {Properties} from '../../public/properties';
import * as $ from 'Jquery';

// 请求类型
@Injectable()
export class HttpsUtils {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*'})
  };

  constructor(private http: HttpClient, public router: Router) {
  }

  /**
   * 方法用途: get 类型的请求
   * 参数：
   **/
  get<T>(url: string, params?: Object, token?: string): Promise<void | Object> {
    $('#loading').show();
    token = token ? token : sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN);
    params = params ? params : {};
    params['access_token'] = token;
    if (params) {
      url = this.objAppendToUrl(url, params);
    }

    return this.http.get<T>(url, this.httpOptions).toPromise().catch(errorResp => {
      console.log(errorResp);
      return this.handleError(errorResp);
    }).then(onfulfilled => {
      $('#loading').hide();
      return Promise.resolve(onfulfilled);
    });
  }

  /**
   * 方法用途: 发送post类型请求
   * 参数：
   **/
  post<T>(url: string, params: Object, token?: string): Promise<void | Object> {
    $('#loading').show();
    token = token ? token : sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN);
    url += '?access_token=' + token;
    return this.http.post<T>(url, params, this.httpOptions).toPromise().catch(errorResp => {
      this.handleError(errorResp);
    }).then(filled => {
      $('#loading').hide();
      return Promise.resolve(filled);
    });
  }

  /**
   * 方法用途: 发送put请求
   * 参数：
   **/
  put<T>(url: string, params: Object, token?: string): Promise<void | Object> {
    token = token ? token : sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN);
    url += '?access_token=' + token;
    return this.http.put<T>(url, params, this.httpOptions).toPromise().catch(errorResp => {
      this.handleError(errorResp);
    }).then(filled => {
      $('#loading').hide();
      return Promise.resolve(filled);
    });
  }

  /**
   * 方法用途: 发送delete请求
   * 参数：
   **/
  delete<T>(url: string, params?, token?: string): Promise<void | Object> {
    const headers: HttpHeaders = new HttpHeaders();
    token = token ? token : sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN);
    url += '?access_token=' + token;
    if (params) {
      url = this.objAppendToUrl(url, params);
    }
    headers.append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    return this.http.delete(url, this.httpOptions).toPromise().catch(errorResp => {
      this.handleError(errorResp);
    }).then(filled => {
      $('#loading').hide();
      return Promise.resolve(filled);
    });
  }

  private objAppendToUrl(url: string, obj: Object): string {
    url = url + '?';
    Object.keys(obj).forEach(function (key) {
      const param = key + '=' + obj[key];
      url += param + '&';
    });
    if (url.endsWith('&')) {
      url = url.substr(0, url.length - 1);
    }
    if (url.endsWith('?')) {
      url = url.substr(0, url.length - 1);
    }
    return url;
  }

  /**
   * 错误消息类
   * @param error 错误请求响应
   */
  private handleError(error: HttpErrorResponse): Promise<void | Object> {
    if (error.status === 401 || error.status === 0) {
      return this.router.navigate([Urls.UNAUTHENTICATION]);
    }
    return Promise.reject(error);
  }
}
