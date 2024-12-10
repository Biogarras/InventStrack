import { Injectable } from '@angular/core';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { Observable, map} from 'rxjs';
import { HttpParams ,HttpResponse} from '@angular/common/http';
import { Usuario } from 'src/app/models/Usuario/usuario';
import { CrearUsuario } from 'src/app/models/Usuario/crearUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private path = 'Usuario'; // Ruta para la tabla Usuario en Supabase

  constructor(private apiConfig: ApiconfigService) {}

   // Método para agregar una nueva tienda
   crearNuevoUsuario(tienda: CrearUsuario): Observable<HttpResponse<Usuario>> {
    return this.apiConfig.post<Usuario>(this.path, tienda).pipe(
      map(response => {
        const usuarioCreado: Usuario = {
          nombre: response.body?.nombre || null,
          nombreUsuario: response.body?.nombreUsuario || null,
          email: response.body?.email || null,
          password: response.body?.password || null,
          role_id: response.body?.role_id || null

        };
        return new HttpResponse({
          body: usuarioCreado,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText
        });
      })
    );
  }



  obtenerUsuarioPorUsername(nombreUsuario: string): Observable<Usuario> {
    const params = new HttpParams().set('select', '*');
    return this.apiConfig
      .get<Usuario[]>(`${this.path}?nombreUsuario=eq.${nombreUsuario}`, params)
      .pipe(
        map(response => {
          console.log (response)
          if (!response.body || response.body.length === 0) {
            throw new Error('No se encontró el usuario');
          }
          return response.body[0]; // Retorna el primer usuario encontrado
        })
        
      );
  }
 // Método para obtener el rol del usuario
 obtenerRolUsuario(usuarioId: string): Observable<string> {
  return this.apiConfig.get<Usuario[]>(`${this.path}?usuario_id=eq.${usuarioId}`,
       new HttpParams().set('select', 'role_id')).pipe(
       map(response => {
        console.log('aers', response);
        if (!response.body || response.body.length === 0) {
          throw new Error('No se encontró el usuario');
        }
        // Asegura que nunca sea undefined
        return response.body[0].role_id?.toString() ?? 'Rol no definido';
      })
    );
}

}
  // Otros métodos según sea necesario...