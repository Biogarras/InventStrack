import { Injectable } from '@angular/core';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { CrearInventario } from 'src/app/models/Inventario/crearInventario';
import { Inventario } from 'src/app/models/Inventario/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventariosService {

  path = 'inventarios';

  constructor( private apiConfig: ApiconfigService) { }

  // Crear un nuevo inventario
  crearInventario(inventario: CrearInventario):Observable<HttpResponse<CrearInventario>> {
    return this.apiConfig.post<CrearInventario>(this.path, inventario).pipe(
      map(response => {
        const inventarioCreado: CrearInventario={
          id_tienda: response.body?.id_tienda || null,
          estado: response.body?.estado || null,
          id_encargado: response.body?.id_encargado || null,
        };      
        return new HttpResponse({
          body: response.body,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      }),
      catchError(error => {
        console.error('Error al crear el inventario:', error);
        return throwError(() => new Error('Error al crear el inventario. Por favor, inténtelo más tarde.'));
      })
    );
  }
  obtenerInventarios(): Observable<HttpResponse<any[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiConfig.get<any[]>(this.path, params).pipe(
      map(response => {
        const inventariosFiltrados = response.body?.filter(inventario => !inventario.deleted_at);
        return new HttpResponse({
          body: inventariosFiltrados,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      }),
      catchError(error => {
        console.error('Error al obtener inventarios:', error);
        return throwError(() => new Error('Error al obtener inventarios. Por favor, inténtelo más tarde.'));
      })
    );
  }
}


