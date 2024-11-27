import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventariosPendientesPageRoutingModule } from './inventarios-pendientes-routing.module';

import { InventariosPendientesPage } from './inventarios-pendientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventariosPendientesPageRoutingModule
  ],
  declarations: [InventariosPendientesPage]
})
export class InventariosPendientesPageModule {}
