import { Injectable } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  constructor(private _servicioUsuario: UsuariosService) {}

  autentificacion(username: string, password: string): Observable<boolean> {
    // Obtiene la lista de usuarios (puedes hacer esto de manera asíncrona)
    const usuarios = this._servicioUsuario.obtener_lista_usuarios(); // Asegúrate de que este método sea asincrónico si es necesario

    const usuarioExiste = usuarios.some(usuario => {
      // Aquí es donde debes implementar la comparación de contraseñas de forma segura
      return usuario.username === username && this.compararContraseñas(usuario.password, password);
    });

    return of(usuarioExiste);
  }

  // Método de comparación de contraseñas (ejemplo simplificado)
  private compararContraseñas(hashedPassword: string, password: string): boolean {
    // Aquí deberías usar un método de hashing para comparar las contraseñas
    return hashedPassword === password; // Cambia esto por la lógica de comparación adecuada
  }
}