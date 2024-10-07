import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesTiendasPage } from './detalles-tiendas.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesTiendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesTiendasPageRoutingModule {}
