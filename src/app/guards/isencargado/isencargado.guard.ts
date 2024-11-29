import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutentificacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class IsEncargadoGuard implements CanActivate {
  
  constructor(private authService: AutentificacionService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Verificar el rol del usuario
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser && currentUser.role_id == 2) {
      return true;
    } else {
      console.warn('Acceso denegado - Se requiere rol id:2 EncargadoInventario')
      this.router.navigate(['login']); // Redirigir si no es Tienda
      return false;
    }
  }
}