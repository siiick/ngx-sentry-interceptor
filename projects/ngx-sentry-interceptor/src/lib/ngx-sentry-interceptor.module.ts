import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SENTRY_INTERCEPTOR_CONFIG } from './config';
import { ErrorFilter } from './error-filter';
import { SentryInterceptor } from './sentry.interceptor';

export interface SentryInterceptorConfig {
  blacklistCodes ?: number[];
  whitelistCodes ?: number[];
}
@NgModule({})
export class NgxSentryInterceptorModule {
  public static forRoot(config: SentryInterceptorConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxSentryInterceptorModule,
      providers: [
        {
          provide: SENTRY_INTERCEPTOR_CONFIG,
          useValue: config
        },
        ErrorFilter,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SentryInterceptor,
          multi: true
        }
      ]
    };
  }
 }
