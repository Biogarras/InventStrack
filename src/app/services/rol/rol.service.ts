import { Injectable } from '@angular/core';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  path = 'Roles' ;

  constructor(private apiConfig: ApiconfigService) { }

  buscarRol(): Observable<HttpResponse<any>> {
    return this.apiConfig.get<any>(this.path); // Llama a la ruta 'roles' en el backend
  }

}
