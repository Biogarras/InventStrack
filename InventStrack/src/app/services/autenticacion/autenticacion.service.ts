import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  logout() {
    throw new Error('Method not implemented.');
  }
 
 
  constructor(private usuarioService: UsuarioService) { }

  autentificacion(nombreUsuario: string, password: string): Observable<boolean> {
    return this.usuarioService.obtenerUsuarioPorUsername(nombreUsuario).pipe(
      map((usuario: Usuario) => {
        // Aquí debes validar si la contraseña es correcta
        if (usuario && usuario.password === password) { // Asegúrate de ajustar esto si usas encriptación
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error en autenticación:', error);
        return of(false); // Si hay error, retornamos false para indicar que no se autenticó
      })
    );
  }
}