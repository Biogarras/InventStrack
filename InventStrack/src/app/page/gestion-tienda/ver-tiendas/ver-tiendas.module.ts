import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerTiendasPageRoutingModule } from './ver-tiendas-routing.module';

import { VerTiendasPage } from './ver-tiendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerTiendasPageRoutingModule
  ],
  declarations: [VerTiendasPage]
})
export class VerTiendasPageModule {}
