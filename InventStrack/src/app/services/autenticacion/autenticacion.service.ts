import { Injectable } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  usuarioActual: any = null;

  constructor(private _serviciousuario: UsuariosService) { }

  autentificacion(username: string, password: string): boolean {
    const usuarios = this._serviciousuario.obtener_lista_usuarios();
    const usuario = usuarios.find(u => u.username == username && u.password == password);

    if (usuario) {
      this.usuarioActual = usuario; // Guardamos el usuario autenticado
      return true;
    }
    return false;
  }

  esAdministrador(): boolean {
    return this.usuarioActual && this.usuarioActual.role === 'administrador';
  }

  obtenerUsuarioActual() {
    return this.usuarioActual;
  }
}

