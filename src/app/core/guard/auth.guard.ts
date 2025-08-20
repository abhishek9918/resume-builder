import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let loggedInUserDetails = localStorage.getItem('LoggedInUser') as any;
  let currentUser = JSON.parse(loggedInUserDetails);

  if (currentUser && currentUser?.token) {
    console.log('if');
    return true;
  } else {
    console.log('el');

    router.navigateByUrl('/');
    return false;
  }
};
