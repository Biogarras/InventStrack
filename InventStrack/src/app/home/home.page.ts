import { Component } from '@angular/core';
import { TiendasService } from '../services/tiendas/tiendas.service';
import { Tienda } from 'src/app/models/tienda';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tiendas: Tienda [] = [];
  constructor( private tiendaServices:TiendasService) {}

  ngOnInit(){
    this.obtenerTiendas();
  }

  async obtenerTiendas(){
    try{
    const response = await firstValueFrom(this.tiendaServices.obtenerTiendas())
    this.tiendas = response.body || [];
  }catch(error){
    console.error(error)
  }
}

}
