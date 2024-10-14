import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor(private router: Router, private authService: AutentificacionService) {}

  // Método para gestionar usuarios
  gestionarUsuarios() {
    this.router.navigate(['/gestionar-usuarios']); // Cambia la ruta según tu página de gestión de usuarios
  }

  // Método para gestionar tiendas
  gestionarTiendas() {
    this.router.navigate(['/gestionar-tiendas']); // Cambia la ruta según tu página de gestión de tiendas
  }

  // Método para gestionar productos
  gestionarProductos() {
    this.router.navigate(['/gestionar-productos']); // Cambia la ruta según tu página de gestión de productos
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout(); // Llama al método de logout de tu servicio de autenticación
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}