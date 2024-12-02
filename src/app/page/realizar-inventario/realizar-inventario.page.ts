import { Component, OnInit } from '@angular/core';
import { InventariosService } from 'src/app/services/inventarios/inventarios.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
/*import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';*/
import { StockTiendaService } from 'src/app/services/stock_tienda/stock-tienda.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-realizar-inventario',
  templateUrl: './realizar-inventario.page.html',
  styleUrls: ['./realizar-inventario.page.scss'],
})
export class RealizarInventarioPage implements OnInit {
  scannedResult: string | null = null;
  product: any = null;
  quantity: number | null = null;
  inventoryDetails: any[] = [];
  loading = false;
  storeId: number = 1;
  inventoryId: number | null = null;

  constructor(
    private inventariosService: InventariosService,
    private productosService: ProductosService,
    private stock_TiendaService: StockTiendaService,
    private activatedRoute: ActivatedRoute,
    private navCtrl : NavController
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const selectedInventoryId = params['idInventario'];
      if (selectedInventoryId) {
        this.setInventoryId(selectedInventoryId);
      }
    });
  }

  setInventoryId(id: number) {
    this.inventoryId = id;
    console.log('ID del Inventario:', this.inventoryId); // Muestra la ID del inventario en la consola
  }

  searchProduct(EAN_13: string | number) {
    this.loading = true;
    this.productosService.buscarProductoPorCodigoBarra(EAN_13).subscribe(
      (response) => {
        this.product = response.body;
        this.loading = false;
      },
      (error) => {
        console.error('Error al buscar producto:', error);
        alert('Producto no encontrado.');
        this.loading = false;
      }
    );
  }

  addInventoryDetail() {
    if (this.product && this.quantity != null && this.inventoryId) {
      this.stock_TiendaService.obtenerStockPorTienda(this.storeId).subscribe(
        (response) => {
          const stockTienda = response.body?.find((item: any) => item.sku === this.product.sku);
          const stockInicial = stockTienda ? stockTienda.stock : 0;
  
          const detail = {
            id_inventario: this.inventoryId,
            sku: this.product.sku,
            cantidad_contada: this.quantity,
            stock_inicial: stockInicial,
            precio_venta: this.product.precio_venta,
            costo: this.product.costo,
          };
  
          this.inventoryDetails.push(detail);
          console.log('Detalle de inventario agregado:', detail);
          this.resetForm();
        },
        (error) => {
          console.error('Error al obtener el stock inicial:', error);
          alert('No se pudo obtener el stock inicial del producto.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  resetForm() {
    this.product = null; // Limpia el producto seleccionado
    this.quantity = null; // Reinicia la cantidad ingresada
    this.scannedResult = null; // Limpia el código escaneado
  }

  removeDetail(detail: any) {
    this.inventoryDetails = this.inventoryDetails.filter((item) => item !== detail);
  }

  finalizeInventory() {
    if (this.inventoryDetails.length > 0) {
      this.inventoryDetails.forEach((detail) => {
        this.inventariosService.guardarDetalleInventario(detail).subscribe(
          (response) => {
            console.log('Detalle guardado exitosamente:', response);
          },
          (error) => {
            console.error('Error al guardar el detalle del inventario:', error);
          }
        );
      });
      alert('Inventario finalizado exitosamente.');
      this.inventoryDetails = [];
    } else {
      alert('No hay detalles para finalizar el inventario.');
    }
  }

  goBack() {
    this.navCtrl.navigateRoot(['gestion-producto']);  // Ajusta la ruta según la página que quieras
  }
  
}
