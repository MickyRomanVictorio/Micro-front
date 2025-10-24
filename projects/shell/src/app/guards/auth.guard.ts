import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'shared-lib';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUserValue) {
    // Si está logueado, permite el acceso
    return true;
  }

  // Si no está logueado, redirige a /login
  router.navigate(['/login']);
  return false;
};
