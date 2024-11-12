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
          this.tienda.id_tienda = id;  // Aseguramos que la ID esté asignada en el objeto tienda
          console.log('Tienda cargada:', this.tienda); // Verifica si el ID se asigna correctamente
        } else {
          console.error('No se encontró la tienda en la respuesta del servidor.');
        }
      });
    } else {
      console.error('ID de la tienda no encontrado en la URL');
    }
  }

  modificarTienda(tienda: Tienda): Observable<HttpResponse<any>> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Verifica que tienda.id_tienda tenga un valor antes de continuar
    if (!tienda.id_tienda) {
      console.error("El ID de la tienda es requerido para modificar", tienda); 
      throw new Error("El ID de la tienda es requerido para modificar");
    }
    
    // Realiza la llamada a la API utilizando el ID correcto en la URL
    return this.apiConfig.patch<Tienda>(`tiendas/${tienda.id_tienda}`, tienda).pipe(
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

  goBack() {
    this.router.navigate(['/gestion-tienda']);  // Ajusta la ruta según la página que quieras
  }

}
