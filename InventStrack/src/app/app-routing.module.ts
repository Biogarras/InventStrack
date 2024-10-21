import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [

  { path: '', component: LoginComponent },
  
  {
    path: 'login1',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'inicio',
    loadChildren: () => import('./page/inicio/inicio.module').then( m => m.InicioPageModule)
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
    path: 'gestion-inventario',
    loadChildren: () => import('./page/gestion-inventario/gestion-inventario.module').then( m => m.GestionInventarioPageModule)
  },
  
  /*
  {
    path: '',
    redirectTo: 'login1',
    pathMatch: 'full'
  },
 */

  

 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
