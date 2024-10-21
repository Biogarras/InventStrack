import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionTiendaPage } from './gestion-tienda.page';

const routes: Routes = [
  
  {
    path: 'crear-tienda',
    loadChildren: () => import('./crear-tienda/crear-tienda.module').then( m => m.CrearTiendaPageModule)
  },
  {
    path: 'ver-tiendas',
    loadChildren: () => import('./ver-tiendas/ver-tiendas.module').then( m => m.VerTiendasPageModule)
  },
  {
    path: 'modificar-tienda',
    loadChildren: () => import('./modificar-tienda/modificar-tienda.module').then( m => m.ModificarTiendaPageModule)
  },
  {
    path: 'eliminar-tienda',
    loadChildren: () => import('./eliminar-tienda/eliminar-tienda.module').then( m => m.EliminarTiendaPageModule)
  },
  {
    path: '',
    component: GestionTiendaPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionTiendaPageRoutingModule {}
