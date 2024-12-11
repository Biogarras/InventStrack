import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Producto } from 'src/app/models/Producto/producto';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.page.html',
  styleUrls: ['./modificar-producto.page.scss'],
})
export class ModificarProductoPage implements OnInit {

  producto: Producto = {
    sku: null,
    codbarra:null,
    nombre_producto: '',
    familia: '',
    precio_venta: null,
    costo: null
  };

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductosService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['producto']) {
        this.producto = JSON.parse(params['producto']);
      }
    });
  }

  actualizarProducto() {
    this.productoService.actualizarProducto(this.producto).subscribe(response => {
      console.log('Producto actualizado:', response.body);
      this.presentToast('Producto modificado exitosamente');
      this.navCtrl.navigateBack(['gestion-producto/ver-productos']);
    }, error => {
      console.error('Error al actualizar el producto:', error);
      this.presentToast('Error al modificar el producto', 'danger');
    });
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Tiempo que se mostrará (en milisegundos)
      color: color,  // Color del Toast (success, danger, etc.)
      position: 'top',
      cssClass: 'custom-toast', // Posición del Toast (top, middle, bottom)
    });
    await toast.present();
  }
}