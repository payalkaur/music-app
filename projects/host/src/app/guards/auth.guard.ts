import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  console.log(authService.isAuthenticatedUser())

  if (!authService.isAuthenticatedUser()) {
    console.log("false")
    // Redirect to the login page if the user is not authenticated
    router.navigate(['/login']);
    return false;
  }

  return true;
};
