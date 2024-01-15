import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError, retry } from 'rxjs/operators';

const TIMEOUT = 2 * 1000; // 超时时间
const RETRYCOUNT = 2; // 超时 重试次数

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const retry$ = next.handle(req).pipe(
      timeout(TIMEOUT),
      catchError((error: Error) => {
        console.log(error);
        if (error.name === 'TimeoutError') {
          error.message = '接口超时';
          return throwError(() => error);
        }
        if (error instanceof HttpErrorResponse && (error.status === 401)) {
          // HttpErrorResponse 全局错误处理
        }
        return throwError(() => error);
      }),
    )

    return retry$.pipe(
      retry(RETRYCOUNT),
    );
  }
}
