import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearTiendaPage } from './crear-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: CrearTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearTiendaPageRoutingModule {}
