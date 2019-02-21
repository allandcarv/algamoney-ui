import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { AuthService, NotAuthError } from 'src/app/seguranca/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/oauth/token')) {
      return next.handle(req);
    }

    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401 && error.error.error_description.includes('Access token expired')) {
          return this.authService.refreshToken().pipe(
            mergeMap((newToken: string) => {
              req = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}`}});
              return next.handle(req);
            }),
            catchError(() => { throw new NotAuthError(); })
          );
        }

        return throwError(error);

      })
    );

  }
}
