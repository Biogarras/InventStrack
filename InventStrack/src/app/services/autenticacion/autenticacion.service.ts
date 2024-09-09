import { Injectable } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor( private _serviciousuario: UsuariosService) { }


  autentificacion(username: string, password: string): boolean{
    const usuarios = this._serviciousuario.obtener_lista_usuarios();
    const usuarioExiste = usuarios.some(usuario => usuario.username == username && usuario.password == password);
    if (usuarioExiste){
      return true;
    }else{
      return false;
    }
  }

  }


