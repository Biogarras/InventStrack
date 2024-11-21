import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiendasService } from 'src/app/services/tiendas/tiendas.service';
import { NavController } from '@ionic/angular'; 
import { CrearTienda } from 'src/app/models/Tienda/creartienda';
import { ModificarTienda } from 'src/app/models/Tienda/modificartienda';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificar-tienda',
  templateUrl: './modificar-tienda.page.html',
  styleUrls: ['./modificar-tienda.page.scss'],
})
export class ModificarTiendaPage implements OnInit {

  modificarTienda: ModificarTienda = {
    ciudad: '',
    created_at: null,
    deleted_at: null,
    direccion: '',
    id_tienda: 6,
    nombre_tienda: '',
    estado:'',
    
  };
  formularioTienda: any;

  constructor( private navCtrl: NavController,
               private _tiendaService : TiendasService,
               private router: Router, 
               private route : ActivatedRoute) { }



               
  datosCargados = false;

  ngOnInit() {

    console.log('ngOnInit ejecutado'); 
    this.cargarTienda();
    
    console.log('aer aer aer....:',this.modificarTienda) // Llamamos al método para cargar la tienda
  }

  cargarTienda() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this._tiendaService.obtenerTiendaPorId(id).subscribe({
        next: (response) => {
          if (response) {
            this.modificarTienda = response;
            this.datosCargados = true;  // Asigna toda la tienda desde la respuesta
            console.log('Tienda cargada:', this.modificarTienda);
            console.log('ID de la tienda cargada:', this.modificarTienda.id_tienda);
          } else {
            console.error('No se encontró la tienda en la respuesta del servidor.');
            this.datosCargados = false;
          }
          
        },
        error: (err) => {
          console.error('Error al cargar la tienda:', err);
        }
      });
    } else {
      console.error('ID de la tienda no encontrado en la URL');
    }
  }
  

  guardarCambios(){
    const iDTienda = this.modificarTienda?.id_tienda;
    console.log('Tienda cargadadasdsadasadd:', this.modificarTienda);
    if (iDTienda !== null && iDTienda !== undefined){
      const datosParciales ={
        ciudad:this.modificarTienda.ciudad,
        direccion:this.modificarTienda.direccion,
        nombre_tienda:this.modificarTienda.nombre_tienda,
         
      };
      console.log('Datos enviados:', { id: iDTienda, datosParciales });

      this._tiendaService.modificarTienda(iDTienda,datosParciales).subscribe({
        next:(tiendaActualizada) =>{
          this.modificarTienda=datosParciales
          console.log('Tienda modificada exitosamente:', tiendaActualizada);
           this.navCtrl.navigateRoot(['gestion-tienda']);
        },
      error: (err) =>{
        console.error('Error al guardar los cambios:', err.message);
      },

    });
    }else{
      console.error('ID de la tienda no es valido.')
    }
    
  }

  eliminarTienda() {
    if (this.modificarTienda.id_tienda) {
      this._tiendaService.eliminarTienda(this.modificarTienda.id_tienda).subscribe({
        next: () => {
          console.log('Tienda eliminada correctamente');
          this.navCtrl.navigateRoot(['gestion-tienda']); // Redirige a la lista de tiendas después de la eliminación
        },
        error: (err) => {
          console.error('Error al eliminar la tienda:', err);
        }
      });
    } else {
      console.error('ID de tienda no encontrado');
    }
  }

  goBack() {
    this.navCtrl.navigateRoot(['gestion-tienda']);  // Ajusta la ruta según la página que quieras
  }

}
