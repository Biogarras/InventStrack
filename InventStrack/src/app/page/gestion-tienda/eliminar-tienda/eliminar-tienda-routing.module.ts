import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarTiendaPage } from './eliminar-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarTiendaPageRoutingModule {}
