import { Injectable } from '@angular/core';
import { Tienda } from 'src/app/models/Tienda/tienda';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CrearTienda } from 'src/app/models/Tienda/creartienda';
import { ModificarTiendaPage } from 'src/app/page/gestion-tienda/modificar-tienda/modificar-tienda.page';
import { ModificarTienda } from 'src/app/models/Tienda/modificartienda';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  path = 'tiendas';  // Nombre de la tabla en Supabase

  constructor(private apiConfig: ApiconfigService) {}

  // Obtener todas las tiendas que no han sido eliminadas (deleted_at = null)
  obtenerTiendas(): Observable<HttpResponse<Tienda[]>> {
    const params = new HttpParams()
                   .set('select', '*');
    return this.apiConfig.get<Tienda[]>(this.path, params).pipe(
      map(response => {
        // Agregar este log
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
          id_encargado: response.body?.id_encargado || null,
          // Asumimos que una tienda recién creada no está eliminada 
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

  // Obtener tienda por ID
  obtenerTiendaPorId(id: number): Observable<ModificarTienda> {
    const  params = new HttpParams()
      .set('select', '*')
      .set('id_tienda', `eq.${id}`);
      console.log(params.toString())

    return this.apiConfig.get<HttpResponse<ModificarTienda[]>>('tiendas', params).pipe(
      map((response) => {
        console.log('Respuesta del servidor:', response.body);
        if (!response.body) {
          // Manejo explícito del caso en que `body` sea null
          throw new Error('No se encontró la tienda con el ID especificado.');
        }
        const tienda = (response.body)
        return response.body as ModificarTienda;
      }),
      catchError((error) => {
        console.error('Error al obtener la tienda', error);
        return throwError(() => new Error('Error al obtener la tienda. Por favor, inténtelo más tarde.'));
      })
      
    );
  }

modificarTienda(id:number , datosParciales: ModificarTienda):Observable<Tienda>{
  const params = new HttpParams()
    .set('id_tienda', `eq.${id}`); 
  //curl -X PATCH 'https://cmxpunwlvhypskpdnsoc.supabase.co/rest/v1/tiendas?some_column=eq.someValue' \
  return this.apiConfig.patch<Tienda>(this.path,datosParciales,params).pipe(
    map((response) => {
      if (!response.body){
        throw new Error('Error al actualizar la tienda.');
      }
      return response.body;
    }),
    catchError((error) =>{
      console.error('Error al modificar la tienda:', error);
      return throwError(() => new Error('Error al modificar la tienda. Por favor, intentelo mas tarde.'));
    })
  );
}
  // Eliminar una tienda por su ID (soft delete)
  eliminarTienda(id: number): Observable<HttpResponse<any>> {
  const body = { deleted_at: new Date().toISOString() }; // Establece la fecha actual
  return this.apiConfig.patch(`tiendas/${id}`, body).pipe(
    map(response => {
      return new HttpResponse({
        body: response.body,  // En este caso, el body podría ser relevante
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      });
    })
  );
}

obtenerTiendas2(): Observable<HttpResponse<Tienda[]>> {
  const params = new HttpParams()
                 .set('select', 'id_tienda,nombre_tienda,deleted_at,id_encargado'); // Asegúrate de incluir id_encargado
  return this.apiConfig.get<Tienda[]>(this.path, params).pipe(
    map(response => {
      console.log('Respuesta de tiendas:', response.body);
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
  newobtenerTiendaPorId(id: number): Observable<Tienda> {
    const params = new HttpParams().set('select', 'nombre_tienda');
    return this.apiConfig.get<Tienda[]>(`${this.path}?id_tienda=eq.${id}`, params).pipe(
      map(response => {
        if (!response.body || response.body.length === 0) {
          throw new Error('No se encontró la Tienda');
        }
        return response.body[0]; // Retorna el primer usuario encontrado
      })
    );
  }

  agregarNuevaTiendaConEncargado(tienda: CrearTienda, idEncargado: number): Observable<HttpResponse<Tienda>> {
    tienda.id_encargado = idEncargado; // Asigna el id_encargado correctamente
  
    return this.apiConfig.post<Tienda>(this.path, tienda).pipe(
      map(response => {
        const tiendaCreada: Tienda = {
          nombre_tienda: response.body?.nombre_tienda || null,
          direccion: response.body?.direccion || null,
          ciudad: response.body?.ciudad || null,
          id_encargado: idEncargado // Asegúrate de que el id_encargado esté correctamente asignado
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
}