import { Component, OnInit } from '@angular/core';
import { InventariosService } from 'src/app/services/inventarios/inventarios.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { StockTiendaService } from 'src/app/services/stock_tienda/stock-tienda.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { guardarDetalleInv } from 'src/app/models/Inventario/guardarDetalleInv';
import { BarcodeScannerService } from 'src/app/services/BarcodeScannerService/barcode-scanner-service.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-realizar-inventario',
  templateUrl: './realizar-inventario.page.html',
  styleUrls: ['./realizar-inventario.page.scss'],
})
export class RealizarInventarioPage implements OnInit {
  scannedCode: string | null = null;
  product: any = null;
  cantidad: number | null = null;
  inventoryDetails: guardarDetalleInv[] = [];
  loading = false;
  storeId: number = 19;
  inventoryId: number | null = null;
  isPermissionGranted = false;

  barcodes: Barcode[] = [];
  isSupported = false;

  constructor(
    private inventariosService: InventariosService,
    private productosService: ProductosService,
    private stock_TiendaService: StockTiendaService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private barcodeScanner: BarcodeScannerService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const selectedInventoryId = params['idInventario'];
      if (selectedInventoryId) {
        this.setInventoryId(Number(selectedInventoryId));
      }
      BarcodeScanner.isSupported().then((result) => {
        this.isSupported = result.supported;
      });
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    if (barcodes.length > 0) {
      this.scannedCode = barcodes[0].rawValue;
      this.buscarproducto(this.scannedCode);
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
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
          if (this.product.precio_venta) {
            this.product.precio_venta = Math.floor(this.product.precio_venta);
          }
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
      if (this.cantidad < 0) {
        alert('La cantidad no puede ser negativa.');
        return;
      }

      this.stock_TiendaService
        .obtenerStockPorCodigoDeBarraYTienda(this.product.sku, this.storeId)
        .subscribe(
          (response) => {
            const stockProducto = response.body?.[0];
            const stockInicial = stockProducto ? stockProducto.cantidad_disponible : 0;

            const existingDetail = this.inventoryDetails.find(
              (detail) => detail.sku === this.product.sku
            );

            if (existingDetail) {
              const newQuantity = existingDetail.cantidad_contada! + this.cantidad!;
              if (newQuantity < 0) {
                alert('No puedes agregar una cantidad mayor al stock disponible o un número negativo.');
                return;
              }
              existingDetail.cantidad_contada = newQuantity;
            } else {
              const detail: guardarDetalleInv = {
                id_inventario: Number(this.inventoryId),
                sku: this.product.sku,
                cantidad_contada: this.cantidad,
                stock_inicial: stockInicial,
                precio_venta: this.product.precio_venta,
                costo: this.product.costo,
              };

              this.inventoryDetails.push(detail);
            }

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

  async goBack() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas abandonar el inventario? Se perderán los cambios no guardados.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateRoot(['inicio']);
          },
        },
      ],
    });
    await alert.present();
  }
}
