import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Usuario autenticado, permite la navegación
  } else {
    // Redirige al usuario a la página de inicio de sesión o realiza otras acciones
    // según tu lógica de autenticación
    return false; // Usuario no autenticado, bloquea la navegación
  }
};
