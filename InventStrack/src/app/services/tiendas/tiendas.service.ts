import { Injectable } from '@angular/core';
import { Tienda } from 'src/app/models/tienda';


@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  lista_de_tiendas: Tienda[] = [
    {
      
    id: 1,
    nombre: "ElBelloto",
    ciudad: "Quilpue",
    encargado: "Juana Leon",
    },
    {

    id: 2,
    nombre: "MarinaArauco",
    ciudad: "Viña del Mar",
    encargado: "Romina Aguirre"

    }
  ]

  constructor() { }

  obtener_tiendas(): Tienda[]{
    return this.lista_de_tiendas;
  }

  agregarNuevaTienda(tienda: Tienda): void{
    this.lista_de_tiendas.push(tienda)
  }

}
