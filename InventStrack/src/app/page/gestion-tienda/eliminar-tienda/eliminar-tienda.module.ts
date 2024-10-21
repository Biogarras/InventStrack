import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarTiendaPageRoutingModule } from './eliminar-tienda-routing.module';

import { EliminarTiendaPage } from './eliminar-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarTiendaPageRoutingModule
  ],
  declarations: [EliminarTiendaPage]
})
export class EliminarTiendaPageModule {}
