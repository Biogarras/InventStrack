import { Component, OnInit } from '@angular/core';
import { TiendasService } from 'src/app/services/tiendas/tiendas.service';
import { Tienda } from 'src/app/models/Tienda/tienda';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-ver-tiendas',
  templateUrl: './ver-tiendas.page.html',
  styleUrls: ['./ver-tiendas.page.scss'],
})
export class VerTiendasPage implements OnInit {

  tiendas: Tienda [] = [];

  constructor(private tiendasService: TiendasService ,private router : Router, private navCtrl :NavController) { }

  ngOnInit(){
    this.cargarTiendas();
  }

  cargarTiendas() {
      this.tiendasService.obtenerTiendas().subscribe(response => {
        if (response.body) {
          this.tiendas = response.body; // Asignamos la lista de tiendas al array
        }
      });
    }

    goBack() {
      this.navCtrl.navigateRoot(['gestion-tienda']);  // Ajusta la ruta según la página que quieras
    }
    
    editarTienda(id_tienda: number) {
      this.navCtrl.navigateRoot(`/gestion-tienda/modificar-tienda/${id_tienda}`);
    }

    
  }

