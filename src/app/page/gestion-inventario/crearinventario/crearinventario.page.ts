import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CrearInventario } from 'src/app/models/Inventario/crearInventario';
import { InventariosService } from 'src/app/services/inventarios/inventarios.service';
import { TiendasService } from 'src/app/services/tiendas/tiendas.service';

@Component({
  selector: 'app-crearinventario',
  templateUrl: './crearinventario.page.html',
  styleUrls: ['./crearinventario.page.scss'],
})
export class CrearinventarioPage implements OnInit {

  tiendas:any[] = [];
  tiendaSeleccionada: { [key: number]: boolean } = {}; 
  idEncargado = 1;

  nuevoInventario: CrearInventario = {
    id_tienda:0,
    estado: '',
    id_encargado:0
  };

  constructor(
    private tiendasService: TiendasService,
    private inventariosService: InventariosService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.cargarTiendas();
  }

  cargarTiendas() {
    this.tiendasService.obtenerTiendas2().subscribe({
      next: (response) => {
        console.log('Aers', response)
        this.tiendas = response.body || [];      
      },
      error: (error) => {
        console.error('Error al cargar tiendas:', error);
        alert('Error al cargar tiendas. Por favor, inténtelo más tarde.');
      },
    });
  }

  crearInventarios() {
    const tiendasSeleccionadas = Object.keys(this.tiendaSeleccionada)
      .filter((id) => this.tiendaSeleccionada[+id])
      .map((id) => +id);
    console.log('tiendas seleccionadas',tiendasSeleccionadas)
    if (tiendasSeleccionadas.length === 0) {
      alert('Selecciona al menos una tienda.');
      return;
    }
    tiendasSeleccionadas.forEach((tiendaId) => {
      const inventarioData = {
        id_tienda: tiendaId,
        estado: 'Pendiente por realizar',
        id_encargado: this.idEncargado,
      };

      this.inventariosService.crearInventario(inventarioData).subscribe({
        next: (response) => {
          console.log(`Inventario creado para la tienda ${tiendaId}`, response);
          alert(`Inventario levantado para la tienda ${tiendaId}.`);
        },
        error: (error) => {
          console.error('Error al crear inventario:', error);
          alert('Error al crear el inventario. Por favor, inténtelo más tarde.');
        },
      });
    });
  }

  goBack() {
    this.navCtrl.navigateRoot(['gestion-inventario']); // Ajusta la ruta según tu configuración
  }

  

}
