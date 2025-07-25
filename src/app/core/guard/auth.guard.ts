import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let loggedInUserDetails = localStorage.getItem('LoggedInUser') as any;
  let currentUser = JSON.parse(loggedInUserDetails);
  console.log(currentUser?.access_token, '  token');

  if (currentUser && currentUser?.token) {
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
};
