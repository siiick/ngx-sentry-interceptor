import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as Sentry from '@sentry/browser';

import { ErrorFilter } from './error-filter';

@Injectable()
export class SentryInterceptor implements HttpInterceptor {
  constructor(private responseFilter: ErrorFilter) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (
          'HttpErrorResponse' === error.name &&
          this.responseFilter.filter(error.status)
        ) {
          this.handleErrorResponse(req, error);
        }
        return Observable.throw(error);
      })
    );
  }

  private handleErrorResponse(
    req: HttpRequest<any>,
    res: HttpErrorResponse
  ): void {
    const context = {
      request: {
        method: req.method,
        url: req.url
      },
      response: {
        status: res.status,
        message: res.message
      }
    };

    this.reportError(req.url, context);
  }

  private reportError(url: string, extra: any): void {
    const domain = this.getDomainName(url);

    Sentry.captureMessage(
      `HTTP ${extra.request.method} request to ${domain} failed.`
      // {
      //   extra,
      //   logger: 'ngx-raven-interceptor',
      //   tags: {
      //     'http-domain': domain
      //   }
      // }
    );
  }

  private getDomainName(url: string): string {
    try {
      return new URL(url).host;
    } catch (e) {
      return '[invalid domain]';
    }
  }
}
