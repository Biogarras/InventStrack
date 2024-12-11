import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleInventarioService } from 'src/app/services/detalle-inventario/detalle-inventario.service';

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
    private detalleInventarioService: DetalleInventarioService
  ) {}

  ngOnInit() {
    this.idInventario = +this.route.snapshot.paramMap.get('idInventario')!;
    this.cargarDetalleInventario();
  }

  cargarDetalleInventario() {
    this.detalleInventarioService.obtenerDetalleInventario(this.idInventario).subscribe((response) => {
      this.detalleInventario = response.body || [];
      this.calcularTotales();
    });
  }

  calcularTotales() {
    this.diferenciaTotal = this.detalleInventario.reduce((sum, item) => sum + (item.diferencia || 0), 0);
    this.diferenciaValorizadaTotal = this.detalleInventario.reduce(
      (sum, item) => sum + (item.diferencia_valorizada || 0),
      0
    );
  }
}