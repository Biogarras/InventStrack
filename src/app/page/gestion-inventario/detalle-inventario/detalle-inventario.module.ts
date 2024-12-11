import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleInventarioPageRoutingModule } from './detalle-inventario-routing.module';

import { DetalleInventarioPage } from './detalle-inventario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleInventarioPageRoutingModule
  ],
  declarations: [DetalleInventarioPage]
})
export class DetalleInventarioPageModule {}
