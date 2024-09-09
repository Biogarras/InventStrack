import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTiendasPage } from './lista-tiendas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTiendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaTiendasPageRoutingModule {}
