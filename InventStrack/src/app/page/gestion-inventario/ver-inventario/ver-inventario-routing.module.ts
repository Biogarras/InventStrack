import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerInventarioPage } from './ver-inventario.page';

const routes: Routes = [
  {
    path: '',
    component: VerInventarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerInventarioPageRoutingModule {}
