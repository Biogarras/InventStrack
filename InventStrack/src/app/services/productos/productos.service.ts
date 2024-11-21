import { Injectable } from '@angular/core';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { Producto } from 'src/app/models/Producto/producto';
import { map, Observable } from 'rxjs';
import { HttpParams, HttpResponse } from '@angular/common/http';

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






}
