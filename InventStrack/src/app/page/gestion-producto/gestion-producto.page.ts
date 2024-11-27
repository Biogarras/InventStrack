import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-gestion-producto',
  templateUrl: './gestion-producto.page.html',
  styleUrls: ['./gestion-producto.page.scss'],
})
export class GestionProductoPage implements OnInit {

  constructor(private router: Router,private navCtrl:NavController) { }

  ngOnInit() {
  }
  crearProducto() {
    this.navCtrl.navigateRoot(['gestion-producto/crear-producto']);
  }

  // Navega a la página de visualización de inventarios
  verProductos() {
    this.navCtrl.navigateRoot(['gestion-producto/ver-producto']);
  }

  // Navega a la página de modificación de inventario
  modificarTienda() {
    this.navCtrl.navigateRoot(['gestion-tienda/modificar-tienda']);
  }

  // Navega a la página de eliminación de inventario
  eliminarTienda(){
    this.navCtrl.navigateRoot(['gestion-tienda/eliminar-tienda']);
  }

  // Vuelve a la página de inicio o a la anterior
  goBack() {
    this.navCtrl.navigateRoot(['inicio']);  // Ajusta la ruta según la página que quieras
  }
}

