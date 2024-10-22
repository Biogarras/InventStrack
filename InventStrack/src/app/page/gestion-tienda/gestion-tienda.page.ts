import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-tienda',
  templateUrl: './gestion-tienda.page.html',
  styleUrls: ['./gestion-tienda.page.scss'],
})
export class GestionTiendaPage implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }
  crearTienda() {
    this.router.navigate(['/gestion-tienda/crear-tienda']);
  }

  // Navega a la página de visualización de inventarios
  verTiendas() {
    this.router.navigate(['/gestion-tienda/ver-tiendas']);
  }

  // Navega a la página de modificación de inventario
  modificarTienda() {
    this.router.navigate(['/gestion-tienda/modificar-tienda']);
  }

  // Navega a la página de eliminación de inventario
  eliminarTienda(){
    this.router.navigate(['/eliminar-tienda']);
  }

  // Vuelve a la página de inicio o a la anterior
  goBack() {
    this.router.navigate(['/inicio']);  // Ajusta la ruta según la página que quieras
  }
}
