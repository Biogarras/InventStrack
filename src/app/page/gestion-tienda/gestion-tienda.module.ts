import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionTiendaPageRoutingModule } from './gestion-tienda-routing.module';

import { GestionTiendaPage } from './gestion-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionTiendaPageRoutingModule
  ],
  declarations: [GestionTiendaPage]
})
export class GestionTiendaPageModule {}
