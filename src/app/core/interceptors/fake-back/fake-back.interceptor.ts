import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {
  private _heroJsonPath = 'backend/db.json';
  constructor(private http: HttpClient) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }
  /**
   * Handle request's and support with mock data.
   * @param req
   * @param next
   */
  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;

    if (url.endsWith('/heroes') && method === 'GET') {
      req = req.clone({
        url: this._heroJsonPath,
      });

      return next.handle(req).pipe(delay(500));
    }

    if (url.endsWith('/heroes') && method === 'POST') {
      const { body } = req.clone();
      // assign a new uuid to new hero
      body.id = Math.random().toString(36).slice(-8);
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }
    if (url.match(/\/heroes\/.*/) && method === 'DELETE') {
      const empId = this.getHeroId(url);
      return of(new HttpResponse({ status: 200, body: empId })).pipe(
        delay(500)
      );
    }
    // if there is not any matches return default request.
    return next.handle(req);
  }
  /**
   * Get Hero unique uuid from url.
   * @param url
   */
  getHeroId(url: any) {
    const urlValues = url.split('/');
    return urlValues[urlValues.length - 1];
  }
}
/**
 * Mock backend provider definition for app.module.ts provider.
 */
export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};
