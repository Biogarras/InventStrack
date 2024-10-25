import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  
  constructor(private usuarioService: UsuarioService) { }

  autentificacion(nombreUsuario: string, password: string): Observable<boolean> {
    return this.usuarioService.obtenerUsuarioPorUsername(nombreUsuario).pipe(
      map((usuario: Usuario) => {
        // Aquí debes validar si la contraseña es correcta
        if (usuario && usuario.password === password) { // Asegúrate de ajustar esto si usas encriptación
          localStorage.setItem('authToken', 'some-token');
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

  logout() {
    // Eliminar cualquier información de autenticación
    localStorage.removeItem('authToken'); // Elimina el token o la información del usuario
    console.log('Sesión cerrada correctamente');
  }

}