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
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private _toaster: ToastrService
  ) {}
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
        if (error.status === 401 || error.status === 403) {
          localStorage.removeItem('LoggedInUser');
          this.router.navigate(['/auth/login']);
        } else if (error.status === 0) {
          this._toaster.error(
            'Network error: Please check your internet connection.',
            'Error'
          );

          localStorage.removeItem('LoggedInUser');
          this.router.navigate(['/auth/login']);
        }
        return throwError(error);
      })
    );
  }
}
