import { Injectable } from '@angular/core';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { stock_tienda } from 'src/app/models/Stock_tienda/stock_tienda';
import { HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockTiendaService {
  path = 'stock_tienda';

  constructor(private apiConfig: ApiconfigService) { }

  obtenerStockPorTienda(idTienda:number):Observable<HttpResponse<any>>{
    const params = new HttpParams()
      .set('id_tienda',`eq.${idTienda}`);
      return this.apiConfig.get<any>(this.path,params).pipe(
        map((response) =>{
          console.log('A ver el stock de tiendas o.o',response)
          return new HttpResponse({
            body:response.body,
            headers: response.headers,
            status:response.status,
            statusText:response.statusText,
          });

        }),
        catchError((error) =>{
          console.error('Error al obtener inventarios pendientes:',error);
          return throwError(() => new Error('Error al cargar inventarios pendientes.'))
        })
      );
     
  }
}
