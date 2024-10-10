import { Injectable } from '@angular/core';
import { Tienda } from 'src/app/models/tienda';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CrearTienda } from 'src/app/models/CrearTienda';


@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  path = 'tiendas'

  constructor(private apiConfig: ApiconfigService){}

  obtenerTiendas():Observable<HttpResponse<Tienda[]>>{
    
    const params = new HttpParams().set('select', '*');
    return this.apiConfig.get<Tienda[]>(this.path, params).pipe(
      map(response =>{
        console.log(response)
        const datoFiltrado = response.body?.filter(tienda => tienda.deleted_at === null);


      return new HttpResponse ({
        body : datoFiltrado,
        headers : response.headers,
        status : response.status,
        statusText: response.statusText,
      })
    })
    );
  }

  agregarTienda(tienda: CrearTienda): Observable <HttpResponse<Tienda>>{
    return this.apiConfig.post<CrearTienda>(this.path,tienda);
  }

  actualizarTienda (tienda:CrearTienda, id:1){
    try{
      const params = new HttpParams().set("id", `eq.${id}`);   
    return this.apiConfig.patch(this.path, tienda, params)
  }catch(e){
    console.log(e)
    return e
  }
}

}
