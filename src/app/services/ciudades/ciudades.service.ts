import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiconfigService } from '../apiconfig/apiconfig.service';


@Injectable({
  providedIn: 'root',
})
export class CiudadesService {

  path = 'ciudades' ;

  constructor(private apiConfigService: ApiconfigService) {}

  obtenerCiudades(): Observable<any[]> {
    // Usamos el operador map para extraer solo el cuerpo de la respuesta
    return this.apiConfigService.get<any[]>('/ciudades').pipe(
      map((response) => response.body || []) // Asegúrate de devolver solo el body
    );
  }
}