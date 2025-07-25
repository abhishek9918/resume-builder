import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userData = localStorage.getItem('LoggedInUser');
    if (userData) {
      this.router.navigate(['/app']);
      return false;
    }
    return true;
  }
}
