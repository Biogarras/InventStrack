import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionProductoPageRoutingModule } from './gestion-producto-routing.module';

import { GestionProductoPage } from './gestion-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionProductoPageRoutingModule
  ],
  declarations: [GestionProductoPage]
})
export class GestionProductoPageModule {}
