import { Component, OnInit } from '@angular/core';
import { CrearTienda } from 'src/app/models/Tienda/creartienda';
import { TiendasService } from 'src/app/services/tiendas/tiendas.service';
import { CiudadesService } from 'src/app/services/ciudades/ciudades.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-tienda',
  templateUrl: './crear-tienda.page.html',
  styleUrls: ['./crear-tienda.page.scss'],
})
export class CrearTiendaPage implements OnInit {
  nuevaTienda: CrearTienda = {
    nombre_tienda: '',
    direccion: '',
    ciudad: '',
    id_encargado: 0
  };

  ciudades: any[] = []; // Lista de ciudades
  usuariosDisponibles: any[] = []; // Lista de usuarios sin tienda asignada

  constructor(
    private tiendasService: TiendasService,
    private ciudadesService: CiudadesService,
    private usuarioService: UsuarioService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.cargarCiudades();
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (response) => {
        this.usuariosDisponibles = response.body || [];
        console.log('Usuarios disponibles:', this.usuariosDisponibles);
      },
      error: (error) => {
        console.error('Error al cargar los usuarios', error);
      },
    });
  }

  cargarCiudades() {
    this.ciudadesService.obtenerCiudades().subscribe({
      next: (data) => {
        this.ciudades = data;
      },
      error: (error) => {
        console.error('Error al cargar las ciudades', error);
      },
    });
  }

  crearTienda() {
    

    // Validación de campos requeridos
    if (!this.nuevaTienda.nombre_tienda || !this.nuevaTienda.direccion || !this.nuevaTienda.ciudad) {
      alert('Por favor complete todos los campos de la tienda.');
      return;
    }

    this.tiendasService.agregarNuevaTienda(this.nuevaTienda).subscribe({
      
      next: (response) => {
      
        console.log('Tienda creada con éxito', response);
        alert('Tienda creada con éxito');
        
        // Limpiar los datos ingresados
        this.nuevaTienda = {
          nombre_tienda: '',
          direccion: '',
          ciudad: '',
          id_encargado: 0
        };

        // Redirigir a la lista de tiendas o a donde sea necesario
        this.router.navigate(['/gestion-tienda']);
      },
      error: (error) => {
        console.error('Error al crear tienda', error);
        alert('Error al crear la tienda');
      },
    });
  }

  goBack() {
    this.navCtrl.navigateRoot(['gestion-tienda']);
  }
}