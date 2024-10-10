import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Tienda } from 'src/app/models/tienda';
import { TiendasService } from 'src/app/services/tiendas/tiendas.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CrearTienda } from 'src/app/models/CrearTienda';

@Component({
  selector: 'app-lista-tiendas',
  templateUrl: './lista-tiendas.page.html',
  styleUrls: ['./lista-tiendas.page.scss'],
})
export class ListaTiendasPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  mensaje = "";
  name = "";
  tiendas: Tienda[] = [];
  alertButtons = ['Ok'];

  isAdmin: boolean = false;

  nueva_tienda: CrearTienda = {
    id: 0,
    nombre: "",
    ciudad: "",
    region: "",
    direccion: "",
    deleted_at: new Date('2024-01-01')
  };

  constructor(private _serviceTienda: TiendasService) { }

  async ngOnInit() {
    try {
      this.obtenerTiendas();
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error("Error en Authentificación:", error.status);
      }
    }
  }

  async obtenerTiendas() {
    const response: HttpResponse<Tienda[]> = await firstValueFrom(this._serviceTienda.obtenerTiendas());
    console.log(response);
    this.tiendas = response.body || [];
  }

  cancelar() {
    this.modal.dismiss(null, 'cancel');
  }

  async agregarTienda(nuevaTienda: CrearTienda) {
    console.log(nuevaTienda);
    const response: HttpResponse<Tienda> = await firstValueFrom(this._serviceTienda.agregarTienda(nuevaTienda));
    console.log(response);
    this.obtenerTiendas();
    this.modal.dismiss(this.name, 'confirm');
  }

  async onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<any>>;
    const role = ev.detail.role;

    if (role === 'confirm') {
      console.log("Confirmación recibida:", ev.detail.data);
      this.tiendas.push(ev.detail.data); // Agrega la nueva tienda a la lista si la acción fue confirmada
    } else if (role === 'cancel') {
      console.log("Modal cancelado.");
    }
  }
}