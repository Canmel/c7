import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Properties} from '../../public/properties';
import {Urls} from '../../public/url';

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
    }).toPromise()
      .catch(errorResp => {
        if (errorResp.status === 200) {
          return Promise.resolve({text: errorResp.error.text, httpStatus: 200});
        }
        if (errorResp['status'] === 401) {
          sessionStorage.clear();
          this.router.navigate([Urls.SESSION.LOGIN]);
        }
        return Promise.reject(errorResp.error);
      })
      .then(onfulfilled => {
        if (200 === onfulfilled['httpStatus']) {
          return Promise.resolve(onfulfilled);
        }
        if (404 === onfulfilled['httpStatus']) {
          alert('未找到请求页面');
        }
        alert('请求出错');
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
    }).toPromise().catch(error => {
      if (error['status'] === 401) {
        sessionStorage.clear();
        this.router.navigate([Urls.SESSION.LOGIN]);
      }
      return Promise.reject(error['error']);
    }).then(onfulfilled => {
      if (200 === onfulfilled['httpStatus']) {
        return Promise.resolve(onfulfilled);
      }
      if (404 === onfulfilled['httpStatus']) {
        return Promise.reject(onfulfilled);
      }
      return Promise.reject(onfulfilled);
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
      if (errorResp.url.endsWith(Urls.SESSION.REJECTED)) {
        this.router.navigate(['login']);
      }
      return Promise.reject(errorResp.error);
    }).then(onfulfilled => {
      if (200 === onfulfilled['httpStatus']) {
        return Promise.resolve(onfulfilled);
      }
      return Promise.reject(onfulfilled);
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
      return Promise.reject(errorResp.error);
    }).then(onfulfilled => {
      if (200 === onfulfilled['httpStatus']) {
        return Promise.resolve(onfulfilled);
      }
      return Promise.reject(onfulfilled);
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
}
