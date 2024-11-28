import { Component, OnInit } from '@angular/core';
import { InventariosService } from 'src/app/services/inventarios/inventarios.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { TmplAstBlockNode } from '@angular/compiler';
import { StockTiendaService } from 'src/app/services/stock_tienda/stock-tienda.service';
import { ActivatedRoute } from '@angular/router';



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
  storeId:number=1;
  inventoryId: number | null = null;

  constructor(private inventariosService:InventariosService,
              private productosService:ProductosService,
              private stock_TiendaService:StockTiendaService,
              private activatedRoute: ActivatedRoute
              
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
        const selectedInventoryId = params['idInventario'];
        if (selectedInventoryId) {
          this.setInventoryId(selectedInventoryId);
        }
      });
  }

  setInventoryId(id: number) {
    this.inventoryId = id;
    console.log('ID del Inventario:', this.inventoryId);  // Muestra la ID del inventario en la consola
  }

  async startScan(){
    try{
  
        const scanResult= await CapacitorBarcodeScanner.scanBarcode({
          hint: CapacitorBarcodeScannerTypeHint.ALL,
      });

      if (scanResult.ScanResult){
        this.scannedResult = scanResult.ScanResult;
        console.log('codigo scaneado:',this.scannedResult);
        
        //busca el producto relacionado con el codigo escaneado
        this.product= await this.productosService.buscarProductoPorCodigoBarra(this.scannedResult);
        console.log('Producto:',this.product);
      }
    }catch (error){
        console.error('Error al escanear codigo de barras',error);
    }  
  }  
  searchProduct(EAN_13: number) {
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
    if (this.product && this.quantity != null) {

      this.stock_TiendaService.obtenerStockPorTienda(this.storeId).subscribe(
        (response) => {
          //Buscamos el stock especifico del producto en la respuesta
          const stockTienda = response.body.find((item:any) => item.sku === this.product.sku);
          const stockInicial = stockTienda ? stockTienda.stock:0; // Usa 0 si no se encuentro

          const detail = {
            id_inventario: this.inventoryId, // Cambia por el ID de inventario actual
            sku: this.product.sku,
            cantidad_contada: this.quantity,
            stock_inicial: stockInicial,
            precio_venta: this.product.precio_venta,
            costo :this.product.costo
      };
      //agregar el detalle al inventario....
        this.inventoryDetails.push(detail);
        this.resetForm();
      },
      (error) => {
        console.error('Error al obtener el stock inicial:', error);
        alert ('No se pudo obtener el stock inicial del producto.');
      }
      );
    } else {
    alert ('Por favor, completa todos los campos.');
    }
  }
  resetForm() {
    this.product = null;  // Limpia el producto seleccionado
    this.quantity = null; // Reinicia la cantidad ingresada
    this.scannedResult = null; // Limpia el código escaneado
  }
}