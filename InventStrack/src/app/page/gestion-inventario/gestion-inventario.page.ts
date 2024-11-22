import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-gestion-inventario',
  templateUrl: './gestion-inventario.page.html',
  styleUrls: ['./gestion-inventario.page.scss'],
})
export class GestionInventarioPage implements OnInit {


  constructor(private router: Router , private navCtrl:NavController) { }

  ngOnInit() {}

  // Navega a la página de creación de inventario
  crearInventario() {
    this.navCtrl.navigateRoot(['gestion-inventario/crearinventario']);
  }

  // Navega a la página de visualización de inventarios
  verInventarios() {
    this.navCtrl.navigateRoot(['gestion-tienda/ver-tiendas']);
  }

  // Navega a la página de modificación de inventario
  modificarInventario() {
    this.router.navigate(['/modificar-inventario']);
  }

  // Navega a la página de eliminación de inventario
  eliminarInventario() {
    this.router.navigate(['/eliminar-inventario']);
  }

  // Vuelve a la página de inicio o a la anterior
  goBack() {
    this.navCtrl.navigateRoot(['/inicio']);  // Ajusta la ruta según la página que quieras
  }
}