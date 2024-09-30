import { Injectable } from '@angular/core';
import { Tienda } from 'src/app/models/tienda';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  path = 'tiendas'

  constructor(private apiConfig: ApiconfigService){}

  obtenerTiendas(){
    const params = new HttpParams().set('select', '*');
    return this.apiConfig.get<Tienda[]>(this.path, params).pipe(
      map(response =>{
        const datoFiltrado = response.body?.filter(tienda => tienda.deleted_at === null);


      return new HttpResponse ({
        body : datoFiltrado,
        headers : response.headers,
        status : response.status,
        statusText: response.statusText
      })
    })
    )
  }





}
