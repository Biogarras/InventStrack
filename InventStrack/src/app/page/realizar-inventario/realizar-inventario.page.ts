import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-realizar-inventario',
  templateUrl: './realizar-inventario.page.html',
  styleUrls: ['./realizar-inventario.page.scss'],
})
export class RealizarInventarioPage implements OnInit {
  scannedResult: string | null = null;
  product: any = null; // Aquí se guardará el producto obtenido
  quantity: number | null = null;

  constructor(private productosService : ProductosService) { }

  ngOnInit() {
  }

  

  stopScan() {
    
  }

  saveInventory() {
    if (this.product && this.quantity != null) {
      console.log('Guardando inventario:', {
        producto: this.product,
        cantidad: this.quantity,
      });
      alert('Inventario guardado correctamente.');
      this.resetForm();
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  resetForm() {
    this.scannedResult = null;
    this.product = null;
    this.quantity = null;
  }
}
