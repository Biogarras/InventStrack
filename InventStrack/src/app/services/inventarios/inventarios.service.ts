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

  obtenerInventariosPendientesPorId(idTienda: number): Observable<HttpResponse<any[]>> {
    const params = new HttpParams()
      .set('id_tienda', idTienda.toString())
      .set('estado', 'Pendiente por realizar');
    
    return this.apiConfig.get<any[]>(this.path, params).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al obtener inventarios pendientes:', error);
        return throwError(() => new Error('Error al obtener inventarios pendientes.'));
      })
    );
  }

  obtenerInventariosPendientesPorIdEncargado(idEncargado: number): Observable<HttpResponse<any[]>> {
    const params = new HttpParams().set('id_encargado', `eq.${idEncargado}`);
    return this.apiConfig.get<any[]>(this.path, params).pipe(
      map((response) => {
        return new HttpResponse({
          body: response.body, // Devuelve los inventarios pendientes
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      }),
      catchError((error) =>{
          console.error('Error al obtener inventarios pendientes:',error);
          return throwError(() => new Error('Error al cargar inventarios pendientes.'))


      })
    );
  }

  actualizarEstadoInventario(idInventario: number, estado: string): Observable<HttpResponse<any>> {
    return this.apiConfig.patch<any>(`${this.path}/${idInventario}`, { estado }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al actualizar estado:', error);
        return throwError(() => new Error('Error al actualizar el estado del inventario.'));
      })
    );
  }

  guardarDetalleInventario(detalle: any): Observable<HttpResponse<any>> {
    return this.apiConfig.post<any>('detalle_inventario', detalle).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al guardar detalle:', error);
        return throwError(() => new Error('Error al guardar detalle de inventario.'));
      })
    );
  }
}


