import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarTiendaPageRoutingModule } from './modificar-tienda-routing.module';

import { ModificarTiendaPage } from './modificar-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarTiendaPageRoutingModule
  ],
  declarations: [ModificarTiendaPage]
})
export class ModificarTiendaPageModule {}
