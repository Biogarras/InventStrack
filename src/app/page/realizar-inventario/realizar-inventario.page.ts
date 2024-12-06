import { Component, OnInit } from '@angular/core';
import { InventariosService } from 'src/app/services/inventarios/inventarios.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { StockTiendaService } from 'src/app/services/stock_tienda/stock-tienda.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { guardarDetalleInv } from 'src/app/models/Inventario/guardarDetalleInv';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-realizar-inventario',
  templateUrl: './realizar-inventario.page.html',
  styleUrls: ['./realizar-inventario.page.scss'],
})
export class RealizarInventarioPage implements OnInit {
  scannedResult: string | null = null;
  product: any = null;
  cantidad: number | null = null;
  inventoryDetails: guardarDetalleInv[] = [];
  loading = false;
  storeId: number = 19;
  inventoryId: number | null = null;

  constructor(
    private inventariosService: InventariosService,
    private productosService: ProductosService,
    private stock_TiendaService: StockTiendaService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const selectedInventoryId = params['idInventario'];
      if (selectedInventoryId) {
        this.setInventoryId(Number(selectedInventoryId));
      }
    });
  }

  async startScan() {
    if (Capacitor.isNative) {
      try {
        console.log('Intentando escanear...');
        await this.checkCameraPermissions();
    
        document.querySelector('body')?.classList.add('barcode-scanner-active');
        const { barcodes } = await BarcodeScanner.scan({
          formats: [BarcodeFormat.QrCode],
        });
    
        console.log('Códigos escaneados:', barcodes);
        if (barcodes.length > 0) {
          this.scannedResult = barcodes[0]?.displayValue || null;
          if (this.scannedResult) {
            this.buscarproducto(this.scannedResult);
          }
        } else {
          alert('No se encontró ningún código.');
        }
      } catch (error) {
        console.error('Error al escanear:', error);
        alert('Ocurrió un error al escanear el código.');
      } finally {
        document.querySelector('body')?.classList.remove('barcode-scanner-active');
        await BarcodeScanner.stopScan();
      }
    } else {
      alert('Escaneo de códigos solo está disponible en dispositivos móviles.');
    }
  }
  


  async checkCameraPermissions() {
    const { camera } = await BarcodeScanner.checkPermissions();
    console.log('Permisos de cámara:', camera); // Verificar permisos
  
    if (camera !== 'granted') {
      const { camera: requestedCamera } = await BarcodeScanner.requestPermissions();
      console.log('Permisos solicitados:', requestedCamera); // Verificar si el permiso fue otorgado
      if (requestedCamera !== 'granted') {
        throw new Error('Permisos de cámara no concedidos.');
      }
    }
  }

  setInventoryId(id: number) {
    this.inventoryId = id;
  }

  buscarproducto(EAN_13: string) {
    if (!EAN_13) {
      alert('Por favor, escanee un código de barras válido.');
      return;
    }
    this.loading = true;

    this.productosService.buscarProductoPorCodigoBarra(EAN_13).subscribe(
      (response) => {
        const productos = response;
        if (Array.isArray(productos) && productos.length > 0) {
          this.product = productos[0];
        } else {
          alert('Producto no encontrado.');
          this.product = null;
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error al buscar producto:', error);
        alert('Error al buscar el producto.');
        this.loading = false;
        this.product = null;
      }
    );
  }

  addInventoryDetail() {
    if (this.product && this.cantidad != null && this.inventoryId) {
      this.stock_TiendaService
        .obtenerStockPorCodigoDeBarraYTienda(this.product.sku, this.storeId)
        .subscribe(
          (response) => {
            const stockProducto = response.body?.[0];
            const stockInicial = stockProducto ? stockProducto.cantidad_disponible : 0;

            const detail: guardarDetalleInv = {
              id_inventario: Number(this.inventoryId),
              sku: this.product.sku,
              cantidad_contada: this.cantidad,
              stock_inicial: stockInicial,
              precio_venta: this.product.precio_venta,
              costo: this.product.costo,
            };

            this.inventoryDetails.push(detail);
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
    this.product = null;
    this.cantidad = null;
    this.scannedResult = null;
  }

  removeDetail(detail: guardarDetalleInv) {
    this.inventoryDetails = this.inventoryDetails.filter((item) => item !== detail);
  }

  finalizeInventory() {
    if (this.inventoryDetails.length > 0) {
      this.inventariosService.guardarDetallesInventario(this.inventoryDetails).subscribe(
        () => {
          const idInventario = Number(this.inventoryId);
          const estado = 'Finalizado';

          this.inventariosService.actualizarEstadoInventario(idInventario, estado).subscribe(
            () => {
              alert('Inventario finalizado exitosamente.');
              this.inventoryDetails = [];
            },
            (updateError) => {
              console.error('Error al actualizar el estado del inventario:', updateError);
              alert('Detalles guardados, pero ocurrió un error al actualizar el estado del inventario.');
            }
          );
        },
        (error) => {
          console.error('Error al guardar los detalles del inventario:', error);
          alert('Ocurrió un error al finalizar el inventario.');
        }
      );
    } else {
      alert('No hay detalles para finalizar el inventario.');
    }
  }

  goBack() {
    this.navCtrl.navigateRoot(['inicio']);
  }
}
