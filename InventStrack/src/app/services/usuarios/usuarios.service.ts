import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private lista_de_usuarios: Usuario[] = [
    {
      id: 1,
      nombre: "Tienda el Belloto",
      username: "ElBelloto",
      password: "Elbelloto123",
      email: "elbelloto@prueba.com",
      role: [
        { id: 1, nombre: "cliente" }
      ]
    },
    {
      id: 2,
      nombre: "Eduardo Reyes",
      username: "ereyes",
      password: "ereyes123",
      email: "ereyes@prueba.com",
      role: [
        { id: 2, nombre: "administrador" }
      ]
      
    }
   
  ];
  
  constructor() { }

  public obtener_lista_usuarios(): Usuario[]{
    return this.lista_de_usuarios;
  }

  public obtener_info_usuario(username: string): Usuario | undefined{
    console.log(username)
    return this.lista_de_usuarios.find(usuario => username == usuario.username)
  }

}
