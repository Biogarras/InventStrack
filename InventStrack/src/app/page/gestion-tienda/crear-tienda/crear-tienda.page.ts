import { Component, OnInit } from '@angular/core';
import { CrearTienda } from 'src/app/models/Tienda/creartienda';
import { TiendasService } from 'src/app/services/tiendas/tiendas.service';

@Component({
  selector: 'app-crear-tienda',
  templateUrl: './crear-tienda.page.html',
  styleUrls: ['./crear-tienda.page.scss'],
})
export class CrearTiendaPage implements OnInit {

  nuevaTienda: CrearTienda = {
    nombre_tienda: '',
    direccion: '',
    ciudad: ''
  };
  router: any;

  constructor(private tiendasService: TiendasService) {}

  ngOnInit() {
  }

  crearTienda() {
    this.tiendasService.agregarNuevaTienda(this.nuevaTienda).subscribe({
      next: (response) => {
        console.log('Tienda creada con éxito', response);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error) => {
        console.error('Error al crear tienda', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
    });
  }
  goBack() {
    this.router.navigate(['/gestion-tienda']);  // Ajusta la ruta según la página que quieras
  }




}
