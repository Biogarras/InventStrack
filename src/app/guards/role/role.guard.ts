import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autenticacion/autenticacion.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutentificacionService); // Inyección del servicio de autenticación
  const router = inject(Router); // Inyección del servicio de router
  const snackBar = inject(MatSnackBar); // Inyección de MatSnackBar

  const allowedRoles = route.data['allowedRoles'] as number[]; // Roles permitidos desde las rutas
  const currentUser = authService.getCurrentUser(); // Obtener el usuario actual

  if (currentUser && allowedRoles.includes(currentUser.role_id)) {
    return true; // Si el rol del usuario está permitido, concede acceso
  }

  // Mostrar el mensaje de error y mantener al usuario en la página actual
  snackBar.open('No tienes suficiente permiso para entrar a este módulo', 'Cerrar', {
    duration: 3000, // Tiempo que se muestra el mensaje (en milisegundos)
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });

  return false; // Bloquea el acceso sin redirigir
};
