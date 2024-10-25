import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarTiendaPage } from './modificar-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarTiendaPageRoutingModule {}
