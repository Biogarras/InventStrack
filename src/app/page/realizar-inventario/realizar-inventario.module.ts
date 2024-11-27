import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RealizarInventarioPageRoutingModule } from './realizar-inventario-routing.module';

import { RealizarInventarioPage } from './realizar-inventario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealizarInventarioPageRoutingModule
  ],
  declarations: [RealizarInventarioPage]
})
export class RealizarInventarioPageModule {}
