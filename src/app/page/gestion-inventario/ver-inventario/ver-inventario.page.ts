import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Inventario } from 'src/app/models/Inventario/inventario';
import { InventariosService } from 'src/app/services/inventarios/inventarios.service';
import { TiendasService } from 'src/app/services/tiendas/tiendas.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-ver-inventario',
  templateUrl: './ver-inventario.page.html',
  styleUrls: ['./ver-inventario.page.scss'],
})
export class VerInventarioPage implements OnInit {
  
  // Nuevo array con campos adicionales
  inventarios: (Inventario & { nombre_tienda?: string | null; nombre_encargado?: string | null })[] = [];

  constructor( 
    private inventariosServices: InventariosService,
    private router: Router,
    private navCtrl: NavController,
    private tiendasService: TiendasService,
    private usuarioService: UsuarioService 
  ) { }

  ngOnInit() {
    this.cargarInventarios();
  }

  cargarInventarios() {
    this.inventariosServices.obtenerInventarios().subscribe(response => {
      if (response.body) {
        // Asignamos los datos a la propiedad inventarios y ordenamos por id_inventario
        this.inventarios = response.body.map(inventario => ({
          ...inventario,
          nombre_tienda: null, // Inicializa con null
          nombre_encargado: null, // Inicializa con null
        }));
  
        // Ordenar los inventarios por id_inventario de menor a mayor
        this.inventarios.sort((a, b) => a.id_inventario! - b.id_inventario!);
  
        // Cargar la información adicional de tienda y encargado
        this.inventarios.forEach(inventario => {
          if (inventario.id_tienda) {
            this.tiendasService.newobtenerTiendaPorId(inventario.id_tienda).subscribe(tienda => {
              inventario.nombre_tienda = tienda.nombre_tienda;
            });
          }
  
          if (inventario.id_encargado) {
            this.usuarioService.obtenerUsuarioPorId(inventario.id_encargado).subscribe(usuario => {
              inventario.nombre_encargado = usuario.nombre;
            });
          }
        });
      }
    });
  }

  goBack() {
    this.navCtrl.navigateRoot(['gestion-inventario']);
  }

  verDetalle(idInventario: number) {
    this.navCtrl.navigateRoot(['gestion-inventario/detalle-inventario', idInventario]);
  }
}
