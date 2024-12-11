import { Injectable } from '@angular/core';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleInventarioService {

  private path = 'detalle_inventario'

  constructor(private apiConfig: ApiconfigService) {
   }

   obtenerDetalleInventario(idInventario: number): Observable<any> {
    return this.apiConfig.get<any>(`${this.path}?id_inventario=eq.${idInventario}`);
  }
}
