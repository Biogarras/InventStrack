import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionUsuarioPage } from './gestion-usuario.page';

const routes: Routes = [
 
  {
    path: '',
    component: GestionUsuarioPage
  },

  {
    path: 'crear-usuario',
    loadChildren: () => import('./crear-usuario/crear-usuario/crear-usuario.module').then( m => m.CrearUsuarioPageModule)
  },

  {
    path: 'ver-usuarios',
    loadChildren: () => import('./ver-usuarios/ver-usuarios/ver-usuarios.module').then( m => m.VerUsuariosPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionUsuarioPageRoutingModule {}
