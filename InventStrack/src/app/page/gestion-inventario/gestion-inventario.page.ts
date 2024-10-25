import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-inventario',
  templateUrl: './gestion-inventario.page.html',
  styleUrls: ['./gestion-inventario.page.scss'],
})
export class GestionInventarioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  // Navega a la página de creación de inventario
  crearInventario() {
    this.router.navigate(['/crear-inventario']);
  }

  // Navega a la página de visualización de inventarios
  verInventarios() {
    this.router.navigate(['/ver-inventarios']);
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
    this.router.navigate(['/inicio']);  // Ajusta la ruta según la página que quieras
  }
}