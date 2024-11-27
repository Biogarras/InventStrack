import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionProductoPage } from './gestion-producto.page';

const routes: Routes = [
  {
    path: '',
    component: GestionProductoPage
  },  {
    path: 'crear-producto',
    loadChildren: () => import('./crear-producto/crear-producto.module').then( m => m.CrearProductoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionProductoPageRoutingModule {}
