import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearinventarioPageRoutingModule } from './crearinventario-routing.module';

import { CrearinventarioPage } from './crearinventario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearinventarioPageRoutingModule
  ],
  declarations: [CrearinventarioPage]
})
export class CrearinventarioPageModule {}
