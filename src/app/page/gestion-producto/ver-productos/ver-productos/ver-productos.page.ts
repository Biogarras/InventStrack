import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Producto } from 'src/app/models/Producto/producto';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.page.html',
  styleUrls: ['./ver-productos.page.scss'],
})
export class VerProductosPage implements OnInit {
  
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  familias: string[] = [];
  familiaSeleccionada: string = '';

  constructor(
    private productosSerice: ProductosService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosSerice.obtenerProductos().subscribe(response => {
      if (response.body) {
        this.productos = response.body;
        this.productosFiltrados = [...this.productos];
        this.cargarFamilias(); // Generar familias únicas
      }
    });
  }

  cargarFamilias() {
    // Generar lista de familias únicas directamente desde los productos
    this.familias = Array.from(new Set(this.productos.map(producto => producto.familia || ''))).filter(f => f !== '');
  }

  filtrarPorFamilia() {
    // Filtrar productos según la familia seleccionada
    if (this.familiaSeleccionada) {
      this.productosFiltrados = this.productos.filter(producto => producto.familia === this.familiaSeleccionada);
    } else {
      this.productosFiltrados = [...this.productos];
    }
  }

  irAModificarProducto(producto: Producto) {
    this.navCtrl.navigateRoot(['gestion-producto/modificar-producto'], {
      queryParams: { producto: JSON.stringify(producto) }
    });
  }


  goBack() {
    this.navCtrl.navigateRoot(['gestion-producto']);  // Ajusta la ruta según la página que quieras
  }

}
