import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autenticacion/autenticacion.service';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor(private router: Router, private authService: AutentificacionService,private navCtrl:NavController) {}

  // Método para gestionar usuarios
  gestionarUsuarios() {
    this.navCtrl.navigateRoot(['gestionar-usuarios']); // Cambia la ruta según tu página de gestión de usuarios
  }

  // Método para gestionar tiendas
  gestionarTiendas() {
    this.navCtrl.navigateRoot(['gestion-tienda']); // Cambia la ruta según tu página de gestión de tiendas
  }
  // Método para gestionar productos
  gestionarProductos() {
    this.navCtrl.navigateRoot(['gestion-producto']); // Cambia la ruta según tu página de gestión de productos
  }
  gestionarInventarios() {
    this.navCtrl.navigateRoot(['gestion-inventario']); // Cambia la ruta según tu página de gestión de productos
  }
  realizarInventario() {
    this.navCtrl.navigateRoot(['realizar-inventario']); // Cambia la ruta según tu página de gestión de productos
  }


  // Método para cerrar sesión
  logout() {
    this.authService.logout(); // Eliminar el token
    this.navCtrl.navigateRoot(['login']); // Redirigir al login
  }
}