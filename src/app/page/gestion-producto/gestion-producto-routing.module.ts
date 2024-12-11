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
  },
  {
    path: 'ver-productos',
    loadChildren: () => import('./ver-productos/ver-productos/ver-productos.module').then( m => m.VerProductosPageModule)
  },
  {
    path: 'modificar-producto',
    loadChildren: () => import('./modificar-producto/modificar-producto/modificar-producto.module').then( m => m.ModificarProductoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionProductoPageRoutingModule {}
