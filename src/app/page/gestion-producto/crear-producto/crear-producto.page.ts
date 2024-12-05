import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Producto } from 'src/app/models/Producto/producto';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})
export class CrearProductoPage implements OnInit {

  nuevoProducto: Producto ={
    sku: 0,
    codbarra:null,
    nombre_producto: '',
    familia: '',
    precio_venta: null,
    costo: null,

    
  }

  constructor( private productosService: ProductosService , private router : Router, private navCtrl : NavController) { }

  ngOnInit() {
  }

  crearProducto(){
    this.productosService.agregarNuevoProducto(this.nuevoProducto).subscribe({
      next:(response) => {
        console.log('Producto creado con exito', response);
        alert('Tienda creada con exito')
      },
      error:(error)=> {
        console.error('Error al crear producto',error);
        alert('Error al crear el producto')
      }
      
    });
  }
  goBack() {
    this.navCtrl.navigateRoot(['gestion-producto']);  // Ajusta la ruta según la página que quieras
  }

  
  

}
