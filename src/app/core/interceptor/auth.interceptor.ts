// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url.includes('/login_user') ||
      request.url.includes('/register_user') ||
      request.url.includes('/google_login')
    ) {
      return next.handle(request);
    }

    const currentUser: any = localStorage.getItem('LoggedInUser');
    const JSonToken = JSON.parse(currentUser);

    const token = JSonToken['token'];
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('LoggedInUser');
          this.router.navigate(['/auth/login']);
        }
        return throwError(error);
      })
    );
  }
}
