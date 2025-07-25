import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  user = signal<any>(null);

  isUserLogged = signal<boolean>(false);

  constructor(private route: Router) {}

  setUser(updateUser: any) {
    this.user.set(updateUser);
    this.isUserLogged.set(true);
  }

  clearUser() {
    console.log('Clearing user data');

    localStorage.removeItem('LoggedInUser');
    localStorage.clear();
    this.route.navigate(['auth/login']);
  }
}
