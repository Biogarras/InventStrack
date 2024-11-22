import { Injectable } from '@angular/core';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventariosService {

  path = 'inventarios';

  constructor( private apiConfig: ApiconfigService) { }

  // Crear un nuevo inventario
  crearInventario(data: { id_tienda: number; estado: string; id_encargado: number }): Observable<HttpResponse<any>> {
    return this.apiConfig.post<any>(this.path, data).pipe(
      map(response => {
        if (!response.body) {
          throw new Error('No se pudo crear el inventario.');
        }
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

   // Eliminar un inventario (soft delete)
   eliminarInventario(id: number): Observable<HttpResponse<any>> {
    const body = { deleted_at: new Date().toISOString() }; // Marcar como eliminado
    return this.apiConfig.patch(`${this.path}/${id}`, body).pipe(
      map(response => {
        return new HttpResponse({
          body: response.body,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      }),
      catchError(error => {
        console.error('Error al eliminar el inventario:', error);
        return throwError(() => new Error('Error al eliminar el inventario. Por favor, inténtelo más tarde.'));
      })
    );
  }
}


