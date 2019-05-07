import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Properties} from '../../public/properties';
import {Urls} from '../../public/url';
import {throwError} from 'rxjs';

@Injectable()
export class HttpsUtils {

  constructor(private http: HttpClient, public router: Router) {
  }

  /**
   * 方法用途: get 类型的请求
   * 参数：
   **/
  get<T>(url: string, params?: Object, token?: string): Promise<void | Object> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    headers.append('x-auth-token', token);
    if (token !== '' && sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN)) {
      if (!params) {
        params = {};
      }
      params['access_token'] = sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN);
    }
    if (params) {
      url = this.objAppendToUrl(url, params);
    }

    return this.http.get<T>(url, {
      headers: headers
    }).toPromise().catch(errorResp => {
      this.handleError(errorResp);
    });
  }

  /**
   * 方法用途: 发送post类型请求
   * 参数：
   **/
  post<T>(url: string, params: Object, token?: string): Promise<void | Object> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    headers.append('x-auth-token', token);
    if (sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN)) {
      url = url + '?access_token=' + sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN);
    }
    return this.http.post<T>(url, params, {
      headers: headers
    }).toPromise().catch(errorResp => {
      console.log(url);
      this.handleError(errorResp);
    });
  }

  /**
   * 方法用途: 发送put请求
   * 参数：
   **/
  put<T>(url: string, params: Object, token?: string): Promise<void | Object> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    headers.append('x-auth-token', token);
    if (sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN)) {
      url = url + '?access_token=' + sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN);
    }
    return this.http.put<T>(url, params, {
      headers: headers
    }).toPromise().catch(errorResp => {
      console.log(url);
      this.handleError(errorResp);
    });
  }

  /**
   * 方法用途: 发送delete请求
   * 参数：
   **/
  delete<T>(url: string, params, token?: string): Promise<void | Object> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    // headers.append('x-auth-token', token);
    url = url + params;
    if (sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN)) {
      url = url + '?access_token=' + sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN);
    }
    return this.http.delete(url, {
      headers: headers
    }).toPromise().catch(errorResp => {
      console.log(url);
      this.handleError(errorResp);
    });
  }

  objToParams(obj: Object) {
    if (Object.keys(obj).length === 0) {
      return new HttpParams();
    }
    const params = new HttpParams();
    Object.keys(obj).forEach(function (key) {
      params.set(key, obj[key]);
    });
    return params;
  }

  private mapToParams(map: Map<string, any>): HttpParams {
    console.log('将map转化为params', map);
    const httpParams = new HttpParams();
    map.forEach(function (value, key) {
      httpParams.set(key, value);
    });
    return httpParams;
  }

  private objAppendToUrl(url: string, obj: Object): string {
    url = url + '?';
    Object.keys(obj).forEach(function (key) {
      const param = key + '=' + obj[key];
      url += param + '&';
    });
    if (url.endsWith('&')) {
      url.substr(0, url.length - 1);
    }
    return url;
  }

  /**
   * 错误消息类
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.router.navigate(['/unauthentication']);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
