import { TestBed } from '@angular/core/testing';

import { NgxSentryInterceptorService } from './ngx-sentry-interceptor.service';

describe('NgxSentryInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSentryInterceptorService = TestBed.get(NgxSentryInterceptorService);
    expect(service).toBeTruthy();
  });
});
