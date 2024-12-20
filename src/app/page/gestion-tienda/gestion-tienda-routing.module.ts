import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModificarTiendaPage } from './modificar-tienda/modificar-tienda.page';
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
    path: 'modificar-tienda/:id', // Agregas el parámetro :id aquí
    loadChildren: () => import('./modificar-tienda/modificar-tienda.module').then(m => m.ModificarTiendaPageModule)
  },
  {
    path: 'eliminar-tienda',
    loadChildren: () => import('./eliminar-tienda/eliminar-tienda.module').then( m => m.EliminarTiendaPageModule)
  },
  {
    path: '',
    component: GestionTiendaPage
  },
  {
    path: 'modificar-tienda/:id', // Ruta con parámetro id
    component: ModificarTiendaPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionTiendaPageRoutingModule {}
