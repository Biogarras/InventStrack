import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTiendasPage } from './lista-tiendas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTiendasPage
  },  {
    path: 'detalles-tiendas',
    loadChildren: () => import('./detalles-tiendas/detalles-tiendas.module').then( m => m.DetallesTiendasPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaTiendasPageRoutingModule {}
