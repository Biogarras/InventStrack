import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DetalleInventarioService } from 'src/app/services/detalle-inventario/detalle-inventario.service';
import { ProductosService } from 'src/app/services/productos/productos.service'; // Importa el servicio de productos

@Component({
  selector: 'app-detalle-inventario',
  templateUrl: './detalle-inventario.page.html',
  styleUrls: ['./detalle-inventario.page.scss'],
})
export class DetalleInventarioPage implements OnInit {
  idInventario!: number;
  detalleInventario: any[] = [];
  diferenciaTotal = 0;
  diferenciaValorizadaTotal = 0;

  constructor(
    private route: ActivatedRoute,
    private detalleInventarioService: DetalleInventarioService,
    private productosService: ProductosService, // Inyecta el servicio de productos
    private navCtrl : NavController
  ) {}

  ngOnInit() {
    this.idInventario = +this.route.snapshot.paramMap.get('idInventario')!;
    this.cargarDetalleInventario();
  }

  cargarDetalleInventario() {
    this.detalleInventarioService.obtenerDetalleInventario(this.idInventario).subscribe((response) => {
      this.detalleInventario = response.body || [];
      this.calcularTotales();
      this.obtenerNombreProducto(); // Llamamos la función para obtener el nombre del producto
    });
  }

  calcularTotales() {
    this.diferenciaTotal = this.detalleInventario.reduce((sum, item) => sum + Math.floor(item.diferencia || 0), 0); // Redondea a entero
    this.diferenciaValorizadaTotal = this.detalleInventario.reduce(
      (sum, item) => sum + Math.floor(item.diferencia_valorizada || 0), // Redondea a entero
      0
    );
  }

  obtenerNombreProducto() {
    // Iteramos sobre cada item de detalleInventario
    this.detalleInventario.forEach(item => {
      console.log('Buscando producto con SKU:', item.sku);  // Verifica el SKU

      // Buscar el nombre del producto a partir del SKU
      this.productosService.buscarProductoPorSku(item.sku).subscribe(
        (response) => {
          // Verifica la respuesta
          const producto = response.body;  // Suponiendo que la respuesta es un objeto con 'nombre_producto'
          if (producto) {
            item.nombre_producto = producto.nombre_producto || 'Producto no encontrado';
          } else {
            item.nombre_producto = 'Producto no encontrado';
          }
          console.log('Producto asignado:', item.nombre_producto);  // Verifica la asignación
        },
        (error) => {
          console.error('Error al obtener el nombre del producto', error);
          item.nombre_producto = 'Producto no disponible';
        }
      );
    });
  }

  goBack() {
    this.navCtrl.navigateRoot(['gestion-usuario']);
  }
}
