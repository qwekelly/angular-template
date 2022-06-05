import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=UTF-8',
    });
  }

  formatErrors(responseError: HttpErrorResponse) {
    let data;
    if (typeof responseError.error === 'string') {
      try {
        data = JSON.parse(responseError.error);
      } catch (err) {
        console.error('Fail to parse error', responseError.error);
        data = {error: 'fail to parse'};
      }
    } else {
      data = responseError.error;
    }
    return throwError(data);
  }

  setHttpParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== '' && params[key] !== undefined) {
        httpParams = httpParams.append(key, params[key]);
      }
    });
    return httpParams;
  }

  get(path: string, params = {}): Observable<any> {
    return this.http.get(path, {
      headers: this.headers,
      params: this.setHttpParams(params),
    }).pipe(
      catchError(this.formatErrors),
      map((data) => data)
    );
  }

  getText(path: string, params = {}): Observable<any> {
    return this.http.get(path, {
      headers: this.headers,
      params: this.setHttpParams(params),
      responseType: 'text',
    }).pipe(
      catchError(this.formatErrors)
    );
  }

  getFile(path: string, params = {}): Observable<any> {
    return this.http.get(path, {
      headers: this.headers,
      params: this.setHttpParams(params),
      responseType: 'arraybuffer',
      observe: 'response',
    }).pipe(
      catchError(this.formatErrors)
    );
  }

  getBlob(path: string, params = {}): Observable<any> {
    return this.http.get(path, {
      headers: this.headers,
      params: this.setHttpParams(params),
      responseType: 'blob',
      observe: 'response',
    }).pipe(
      catchError(this.formatErrors)
    );
  }

  put(path: string, body = {}): Observable<any> {
    return this.http.put(
      path,
      JSON.stringify(body),
      {
        headers: this.headers,
      },
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body = {}): Observable<any> {
    return this.http.post(
      path,
      JSON.stringify(body),
      {
        headers: this.headers,
      },
    ).pipe(catchError(this.formatErrors));
  }
}
