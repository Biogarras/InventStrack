import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  

  {

    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./page/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },

  {
    path: 'lista-tiendas',
    loadChildren: () => import('./page/lista-tiendas/lista-tiendas.module').then( m => m.ListaTiendasPageModule)
  },
 
  {
    path: 'detalles-tiendas',
    loadChildren: () => import('./page/lista-tiendas/detalles-tiendas/detalles-tiendas.module').then( m => m.DetallesTiendasPageModule)
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
