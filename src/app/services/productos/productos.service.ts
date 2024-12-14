import { Injectable } from '@angular/core';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { Producto } from 'src/app/models/Producto/producto';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { AnonymousSubject } from 'rxjs/internal/Subject';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  path = 'productos' ;

  constructor( private apiConfig: ApiconfigService) { }

  agregarNuevoProducto(producto: Producto): Observable<HttpResponse<Producto>>{
    return this.apiConfig.post<Producto>(this.path,producto).pipe(
      map(response =>{
          const productoCreado : Producto={
            sku: response.body?.sku || null,
            codbarra:response.body?.codbarra || null,
            nombre_producto: response.body?.nombre_producto || null,
            familia: response.body?.familia|| null,
            precio_venta: response.body?.precio_venta || null,
            costo:response.body?.costo|| null,

          };
          return new HttpResponse({
            body: productoCreado,
            headers: response.headers,
            status: response.status,
            statusText: response.statusText
          });
        })
      );
      
    }


    buscarProductoPorCodigoBarra(codbarra: any): Observable<HttpResponse<any>> {
      const params = new HttpParams()
        .set('select', '*')
        .set('codbarra', `eq.${codbarra}`);
        
      return this.apiConfig.get<HttpResponse<any>>('productos', params).pipe(
        map((response) =>{
          console.log('El producto buscado por codigo de barra es :',response)
          if (!response.body){
            throw new Error ('No se encontro el producto con el codigo de barra ingresado');
          }
          const producto = (response.body)
          return response.body as any;
        }),
        catchError((error) => {
          console.error('Error al obtener el producto', error);
          return throwError (() => new Error ('Error al obtener la tienda. Por favor, intentelo mas tarde.'));
        })
      );
    }

    buscarProductoPorSku(sku: any): Observable<HttpResponse<any>> {
      const params = new HttpParams()
        .set('select', '*')
        .set('sku', `eq.${sku}`);
        
      return this.apiConfig.get<HttpResponse<any>>('productos', params).pipe(
        map((response) =>{
          console.log('El producto buscado por sku es :',response)
          if (!response.body){
            throw new Error ('No se encontro el producto con el sku ingresado');
          }
          const producto = (response.body)
          return response.body as any;
        }),
        catchError((error) => {
          console.error('Error al obtener el producto', error);
          return throwError (() => new Error ('Error al obtener el producto. Por favor, intentelo mas tarde.'));
        })
      );
    }

    obtenerProductos(): Observable<HttpResponse<Producto[]>>{
      const params = new HttpParams ()
            .set('select', '*');
      return this.apiConfig.get<Producto[]>(this.path,params).pipe(
        map(response => {
          const productos = response.body
          return new HttpResponse ({
            body: productos,
            headers : response.headers,
            status: response.status,
            statusText: response.statusText,
          });
        })
      )
    }

    actualizarProducto(producto: Producto): Observable<HttpResponse<Producto>> {
      return this.apiConfig.patch<Producto>(`${this.path}?sku=eq.${producto.sku}`, producto).pipe(
        map(response => {
          return new HttpResponse({
            body: response.body,
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
          });
        })
      );
    }





}
