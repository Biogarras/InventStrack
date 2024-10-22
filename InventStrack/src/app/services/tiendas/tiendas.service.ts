import { Injectable } from '@angular/core';
import { Tienda } from 'src/app/models/Tienda/tienda';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CrearTienda } from 'src/app/models/Tienda/creartienda';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  path = 'tiendas';  // Nombre de la tabla en Supabase

  constructor(private apiConfig: ApiconfigService) {}

  // Obtener todas las tiendas que no han sido eliminadas (deleted_at = null)
  obtenerTiendas(): Observable<HttpResponse<Tienda[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiConfig.get<Tienda[]>(this.path, params).pipe(
      map(response => {
        // Filtrar tiendas que no están eliminadas
        const tiendasFiltradas = response.body?.filter(tienda => tienda.deleted_at === null);
        return new HttpResponse({
          body: tiendasFiltradas,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      })
    );
  }

  // Método para agregar una nueva tienda
  agregarNuevaTienda(tienda: CrearTienda): Observable<HttpResponse<Tienda>> {
    return this.apiConfig.post<Tienda>(this.path, tienda).pipe(
      map(response => {
        const tiendaCreada: Tienda = {
          nombre_tienda: response.body?.nombre_tienda || null,
          direccion: response.body?.direccion || null,
          ciudad: response.body?.ciudad || null,
          created_at: response.body?.created_at || null,
          deleted_at: null // Asumimos que una tienda recién creada no está eliminada
          ,
          id_tienda: null
        };
        return new HttpResponse({
          body: tiendaCreada,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText
        });
      })
    );
  }

  // Actualizar una tienda por su ID
  actualizarTienda(tienda: CrearTienda, id: number): Observable<HttpResponse<Tienda>> {
    const params = new HttpParams().set('id', `eq.${id}`);
    return this.apiConfig.patch<Tienda>(this.path, tienda, params);
  }
}