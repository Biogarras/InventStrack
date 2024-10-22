import { Component, OnInit } from '@angular/core';
import { TiendasService } from 'src/app/services/tiendas/tiendas.service';
import { Tienda } from 'src/app/models/Tienda/tienda';

@Component({
  selector: 'app-ver-tiendas',
  templateUrl: './ver-tiendas.page.html',
  styleUrls: ['./ver-tiendas.page.scss'],
})
export class VerTiendasPage implements OnInit {

  tiendas: Tienda [] = [];

  constructor(private tiendasService: TiendasService) { }

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

    
  }

