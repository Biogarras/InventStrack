import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { roleGuard } from './guards/role/role.guard';

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
    canActivate: [roleGuard],
    data: { allowedRoles: [1, 2, 3] },//usuarios que pueden acceder
    },
  
  {
    path: 'gestion-inventario',
    loadChildren: () => import('./page/gestion-inventario/gestion-inventario.module').then( m => m.GestionInventarioPageModule),
    canActivate: [roleGuard],
    data:{allowedRoles: [1,2]},

  },
  
  {
    path: 'gestion-tienda',
    loadChildren: () => import('./page/gestion-tienda/gestion-tienda.module').then( m => m.GestionTiendaPageModule),
    canActivate: [roleGuard],
    data:{allowedRoles: [1,2]},
    //usuarios que pueden acceder
  },

  {
    path: 'gestion-producto',
    loadChildren: () => import('./page/gestion-producto/gestion-producto.module').then( m => m.GestionProductoPageModule),
    canActivate: [roleGuard],
    data:{allowedRoles: [1,2]},//usuarios que pueden acceder
  },

  {
    path: 'realizar-inventario',
    loadChildren: () => import('./page/realizar-inventario/realizar-inventario.module').then( m => m.RealizarInventarioPageModule),
    canActivate: [roleGuard],
    data:{allowedRoles: [1,3]},//usuarios que pueden acceder
  },

  {
    path: 'gestion-usuario',
    loadChildren: () => import('./page/gestion-usuario/gestion-usuario.module').then( m => m.GestionUsuarioPageModule),
    canActivate: [roleGuard],
    data:{allowedRoles: [1]},//usuarios que pueden acceder
  },

  {
    path: 'inventarios-pendientes',
    loadChildren: () => import('./page/inventarios-pendientes/inventarios-pendientes.module').then( m => m.InventariosPendientesPageModule),
    canActivate: [roleGuard],
    data:{allowedRoles: [1,3]},//usuarios que pueden acceder
  },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
