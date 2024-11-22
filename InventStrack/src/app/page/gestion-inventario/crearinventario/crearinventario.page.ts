import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { InventariosService } from 'src/app/services/inventarios/inventarios.service';

@Component({
  selector: 'app-crearinventario',
  templateUrl: './crearinventario.page.html',
  styleUrls: ['./crearinventario.page.scss'],
})
export class CrearinventarioPage implements OnInit {

  tiendas:any[] = [];
  tiendaSeleccionada: { [key: number]: boolean } = {}; 
  idEncargado = 1;

  constructor(
    private inventariosService: InventariosService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  cargarTiendas() {
    this.inventariosService.obtenerInventarios().subscribe({
      next: (response) => {
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

    if (tiendasSeleccionadas.length === 0) {
      alert('Selecciona al menos una tienda.');
      return;
    }

    tiendasSeleccionadas.forEach((tiendaId) => {
      const inventarioData = {
        id_tienda: tiendaId,
        estado: 'pendiente',
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
