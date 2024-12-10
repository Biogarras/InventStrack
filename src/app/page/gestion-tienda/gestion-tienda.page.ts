import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-gestion-tienda',
  templateUrl: './gestion-tienda.page.html',
  styleUrls: ['./gestion-tienda.page.scss'],
})
export class GestionTiendaPage implements OnInit {


  constructor(private router: Router,private navCtrl:NavController) { }

  ngOnInit() {
  }
  
  crearTienda() {
    this.navCtrl.navigateRoot(['gestion-tienda/crear-tienda']);
  }

  // Navega a la página de visualización de inventarios
  verTiendas() {
    this.navCtrl.navigateRoot(['gestion-tienda/ver-tiendas']);
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
