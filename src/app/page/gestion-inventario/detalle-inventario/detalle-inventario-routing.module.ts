import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleInventarioPage } from './detalle-inventario.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleInventarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleInventarioPageRoutingModule {}
