import { Injectable } from '@angular/core';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { Observable, map} from 'rxjs';
import { HttpParams ,HttpResponse} from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario';

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
          if (!response.body || response.body.length === 0) {
            throw new Error('No se encontró el usuario');
          }
          return response.body[0]; // Retorna el primer usuario encontrado
        })
      );
  }

  // Método para obtener el rol del usuario
  obtenerRolUsuario(usuarioId: string): Observable<number> {
    return this.apiService
      .get<Usuario[]>(`${this.path}?id=eq.${usuarioId}`, new HttpParams().set('select', 'role_id'))
      .pipe(
        map(response => {
          if (!response.body || response.body.length === 0) {
            throw new Error('No se encontró el rol del usuario');
          }
          return response.body[0].rol_id; // Retorna el role_id del usuario
        })
      );
  }

}
  // Otros métodos según sea necesario...