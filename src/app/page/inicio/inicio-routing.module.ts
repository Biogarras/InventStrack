import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';
import { ListaTiendasPage } from 'InventStrack/src/app/page/lista-tiendas/lista-tiendas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTiendasPage
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
