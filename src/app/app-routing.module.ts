import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsTiendaGuard } from './guards/istienda/istienda.guard';
import { IsEncargadoGuard } from './guards/isencargado/isencargado.guard';
import { IsAdminGuard } from './guards/isadmin/isadmin.guard';

const routes: Routes = [
  


  {
    path: '',
    redirectTo: 'login', // Redirige al login al inicio
    pathMatch: 'full'
  },
  {

    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./page/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [IsTiendaGuard,IsEncargadoGuard,IsAdminGuard]//usuarios que pueden acceder
    },
  
  {
    path: 'gestion-inventario',
    loadChildren: () => import('./page/gestion-inventario/gestion-inventario.module').then( m => m.GestionInventarioPageModule),
    canActivate: [IsEncargadoGuard,IsAdminGuard]//usuarios que pueden acceder
  },
  
  {
    path: 'gestion-tienda',
    loadChildren: () => import('./page/gestion-tienda/gestion-tienda.module').then( m => m.GestionTiendaPageModule),
    canActivate: [IsEncargadoGuard,IsAdminGuard]//usuarios que pueden acceder
  },

  {
    path: 'gestion-producto',
    loadChildren: () => import('./page/gestion-producto/gestion-producto.module').then( m => m.GestionProductoPageModule),
    canActivate: [IsEncargadoGuard,IsAdminGuard]//usuarios que pueden acceder
  },

  {
    path: 'realizar-inventario',
    loadChildren: () => import('./page/realizar-inventario/realizar-inventario.module').then( m => m.RealizarInventarioPageModule),
    canActivate: [IsTiendaGuard,IsAdminGuard]//usuarios que pueden acceder
  },

  {
    path: 'gestion-usuario',
    loadChildren: () => import('./page/gestion-usuario/gestion-usuario.module').then( m => m.GestionUsuarioPageModule),
    canActivate: [IsAdminGuard]//usuarios que pueden acceder
  },

  {
    path: 'inventarios-pendientes',
    loadChildren: () => import('./page/inventarios-pendientes/inventarios-pendientes.module').then( m => m.InventariosPendientesPageModule),
    canActivate: [IsTiendaGuard]//usuarios que pueden acceder
  },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
