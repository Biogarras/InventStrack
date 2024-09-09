import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaTiendasPageRoutingModule } from './lista-tiendas-routing.module';

import { ListaTiendasPage } from './lista-tiendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTiendasPageRoutingModule
  ],
  declarations: [ListaTiendasPage]
})
export class ListaTiendasPageModule {}
