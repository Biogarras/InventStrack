import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventariosPendientesPage } from './inventarios-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: InventariosPendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventariosPendientesPageRoutingModule {}
