import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {

    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'inicio',
    loadChildren: () => import('./page/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  
  {
    path: 'gestion-inventario',
    loadChildren: () => import('./page/gestion-inventario/gestion-inventario.module').then( m => m.GestionInventarioPageModule)
  },
  
  {
    path: 'gestion-tienda',
    loadChildren: () => import('./page/gestion-tienda/gestion-tienda.module').then( m => m.GestionTiendaPageModule)
  },

  {
    path: 'gestion-producto',
    loadChildren: () => import('./page/gestion-producto/gestion-producto.module').then( m => m.GestionProductoPageModule)
  },

  {
    path: 'realizar-inventario',
    loadChildren: () => import('./page/realizar-inventario/realizar-inventario.module').then( m => m.RealizarInventarioPageModule)
  },

  {
    path: 'gestion-usuario',
    loadChildren: () => import('./page/gestion-usuario/gestion-usuario.module').then( m => m.GestionUsuarioPageModule)
  },

  {
    path: 'inventarios-pendientes',
    loadChildren: () => import('./page/inventarios-pendientes/inventarios-pendientes.module').then( m => m.InventariosPendientesPageModule)
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
