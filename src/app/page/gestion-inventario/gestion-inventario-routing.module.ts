import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionInventarioPage } from './gestion-inventario.page';

const routes: Routes = [
  

  {
    path: '',
    component: GestionInventarioPage
  },

  {
    path: 'crearinventario',
    loadChildren: () => import('./crearinventario/crearinventario.module').then( m => m.CrearinventarioPageModule)
  },
  
  {
    path: 'ver-inventario',
    loadChildren: () => import('./ver-inventario/ver-inventario.module').then( m => m.VerInventarioPageModule)
  },
  {
    path: 'detalle-inventario/:idInventario',
    loadChildren: () => import('./detalle-inventario/detalle-inventario.module').then( m => m.DetalleInventarioPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionInventarioPageRoutingModule {}
