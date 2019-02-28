import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSentryInterceptorComponent } from './ngx-sentry-interceptor.component';

describe('NgxSentryInterceptorComponent', () => {
  let component: NgxSentryInterceptorComponent;
  let fixture: ComponentFixture<NgxSentryInterceptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSentryInterceptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSentryInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
