import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerInventarioPageRoutingModule } from './ver-inventario-routing.module';

import { VerInventarioPage } from './ver-inventario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerInventarioPageRoutingModule
  ],
  declarations: [VerInventarioPage]
})
export class VerInventarioPageModule {}
