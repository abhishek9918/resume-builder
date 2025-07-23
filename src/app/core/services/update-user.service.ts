// import { Injectable, signal } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root', // This makes it globally available
// })
// export class UpdateUserService {
//   constructor() {}
//   user = signal<any>(null);
//   isUserlogged = signal<any>(false);
//   private userProfileSubject = new BehaviorSubject<any>(null);
//   userProfile$ = this.userProfileSubject.asObservable();

//   setUser(updateUser: any) {
//     console.log(updateUser, 'updateUser in service');
//     this.user.set(updateUser);
//   }
//   checkUserLogin(isLogged: boolean) {
//     this.isUserlogged.set(isLogged);
//   }
//   updateUserProfile(profile: any) {
//     this.userProfileSubject.next(profile);
//   }
// }

// src/app/services/update-user.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  // Signal to hold user object
  user = signal<any>(null);

  // Signal to track login state
  isUserLogged = signal<boolean>(false);

  constructor() {}

  // Set user data
  setUser(updateUser: any) {
    console.log('User updated in service:', updateUser);
    this.user.set(updateUser);
    this.isUserLogged.set(true);
  }

  // Clear user (for logout)
  clearUser() {
    this.user.set(null);
    this.isUserLogged.set(false);
  }
}
