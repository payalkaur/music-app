import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticatedUser()) {
    // Redirect to the login page if the user is not authenticated
    router.navigate(['/login']);
    return false;
  }

  return true;
};
