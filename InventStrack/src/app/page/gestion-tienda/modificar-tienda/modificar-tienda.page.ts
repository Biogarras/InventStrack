import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiendasService } from 'src/app/services/tiendas/tiendas.service';
import { Tienda } from 'src/app/models/Tienda/tienda';
import { HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiconfigService } from 'src/app/services/apiconfig/apiconfig.service';

@Component({
  selector: 'app-modificar-tienda',
  templateUrl: './modificar-tienda.page.html',
  styleUrls: ['./modificar-tienda.page.scss'],
})
export class ModificarTiendaPage implements OnInit {

  tienda: Tienda = {
    id_tienda: null,
    nombre_tienda: '',
    direccion: '',
    ciudad: '',
    created_at: '',
    deleted_at: null
  };

  constructor( private apiConfig : ApiconfigService , private _tiendaService : TiendasService, private router: Router , private route : ActivatedRoute) { }

  ngOnInit() {

    this.cargarTienda(); // Llamamos al método para cargar la tienda
  }

  cargarTienda() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Capturamos el ID de la URL
    if (id) {
      this._tiendaService.obtenerTiendaPorId(id).subscribe((response: HttpResponse<Tienda>) => {
        if (response.body) {
          this.tienda = response.body;
        }
      });
    }
  }

  modificarTienda(tienda: Tienda): Observable<HttpResponse<any>> {
    // Asegúrate de que tienda.id_tienda está presente y correcto
    if (!tienda.id_tienda) {
      throw new Error("El ID de la tienda es requerido para modificar");
    }
    // Realiza la llamada PUT para modificar la tienda
    return this.apiConfig.patch<Tienda>(`tiendas?id=eq.${tienda.id_tienda}`, tienda).pipe(
      map(response => {
        return new HttpResponse({
          body: response.body,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText
        });
      })
    );
  }

}
