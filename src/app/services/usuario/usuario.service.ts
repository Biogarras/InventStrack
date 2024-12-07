import { Injectable } from '@angular/core';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { Observable, map} from 'rxjs';
import { HttpParams ,HttpResponse} from '@angular/common/http';
import { Usuario } from 'src/app/models/Usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private path = 'Usuario'; // Ruta para la tabla Usuario en Supabase

  constructor(private apiService: ApiconfigService) {}


  obtenerUsuarioPorUsername(nombreUsuario: string): Observable<Usuario> {
    const params = new HttpParams().set('select', '*');
    return this.apiService
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
  return this.apiService.get<Usuario[]>(`${this.path}?usuario_id=eq.${usuarioId}`,
       new HttpParams().set('select', 'role_id')).pipe(
       map(response => {
        console.log('aers',response)
        if (!response.body || response.body.length === 0) {
          throw new Error('No se encontró el usuario');
        }
        // Retorna el role_id del usuario como string
        return response.body[0].role_id.toString();
      })
    );
}

}
  // Otros métodos según sea necesario...