import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD:InventStrack/src/app/page/lista-tiendas/lista-tiendas-routing.module.ts
    component: ListaTiendasPage
  },
  {
    path: 'detalles-tiendas',
    loadChildren: () => import ('./detalles-tiendas/detalles-tiendas/detalles-tiendas.module').then( m => m.DetallesTiendasPageModule)
=======
    component: InicioPage
>>>>>>> eduardo:InventStrack/src/app/page/inicio/inicio-routing.module.ts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
