import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearTiendaPageRoutingModule } from './crear-tienda-routing.module';

import { CrearTiendaPage } from './crear-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearTiendaPageRoutingModule
  ],
  declarations: [CrearTiendaPage]
})
export class CrearTiendaPageModule {}
