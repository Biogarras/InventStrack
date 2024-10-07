import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesTiendasPageRoutingModule } from './detalles-tiendas-routing.module';

import { DetallesTiendasPage } from './detalles-tiendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesTiendasPageRoutingModule
  ],
  declarations: [DetallesTiendasPage]
})
export class DetallesTiendasPageModule {}
