import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerTiendasPage } from './ver-tiendas.page';

const routes: Routes = [
  {
    path: '',
    component: VerTiendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerTiendasPageRoutingModule {}
