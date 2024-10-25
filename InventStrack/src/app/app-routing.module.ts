import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
<<<<<<< HEAD
    path: '',
    redirectTo: 'login', // Redirige al login al inicio
    pathMatch: 'full'
=======

    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'inicio',
    loadChildren: () => import('./page/inicio/inicio.module').then( m => m.InicioPageModule)
>>>>>>> eduardo
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
<<<<<<< HEAD

  path: 'detalles-tiendas',
  loadChildren: () => import('./page/lista-tiendas/detalles-tiendas/detalles-tiendas/detalles-tiendas.module').then( m => m.DetallesTiendasPageModule)
  }
=======
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

>>>>>>> eduardo
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
