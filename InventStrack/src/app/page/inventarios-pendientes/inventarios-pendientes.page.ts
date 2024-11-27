import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AutentificacionService } from 'src/app/services/autenticacion/autenticacion.service';
import { InventariosService } from 'src/app/services/inventarios/inventarios.service';

@Component({
  selector: 'app-inventarios-pendientes',
  templateUrl: './inventarios-pendientes.page.html',
  styleUrls: ['./inventarios-pendientes.page.scss'],
})
export class InventariosPendientesPage implements OnInit {

  inventariosPendientes :any[] = [];


  constructor( private InventariosService: InventariosService,
               private authService: AutentificacionService,
               private router : Router,
               private navCtrl:NavController
  ) { }

  ngOnInit() {
    this.cargarInventariosPendientes();
  }

  cargarInventariosPendientes() {
    const idEncargado = this.authService.getCurrentUserId(); 
    if (idEncargado) {
    this.InventariosService.obtenerInventariosPendientesPorIdEncargado(idEncargado).subscribe({
      next: (response) => {
        if (response.body) {
          this.inventariosPendientes = response.body; // Asignar el resultado al array
        }
      },
      error: (err) => {
        console.error('Error al cargar inventarios pendientes:', err);
      },
    });
  }
  }

  realizarInventario(idInventario: number) {
      this.navCtrl.navigateRoot(['realizar-inventario']),
    { queryParams: { idInventario } };
  }

  goBack() {
    this.navCtrl.navigateRoot(['inicio'])
  }
}