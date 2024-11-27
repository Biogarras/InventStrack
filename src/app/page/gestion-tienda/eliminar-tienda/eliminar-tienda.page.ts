import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TiendasService } from 'src/app/services/tiendas/tiendas.service';

@Component({
  selector: 'app-eliminar-tienda',
  templateUrl: './eliminar-tienda.page.html',
  styleUrls: ['./eliminar-tienda.page.scss'],
})
export class EliminarTiendaPage implements OnInit {

  id: number | undefined;

  constructor(private tiendasService: TiendasService, private alertController: AlertController) { }

  ngOnInit() { }

  eliminarTienda() {
    if (this.id !== undefined && this.id > 0) {
      this.tiendasService.eliminarTienda(this.id).subscribe({
        next: async (response) => {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'La tienda ha sido eliminada exitosamente.',
            buttons: ['OK'],
          });
          await alert.present();
        },
        error: async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un problema al eliminar la tienda.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
    } else {
      this.mostrarAlerta('Error', 'Debe ingresar un ID válido.');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}