import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearinventarioPage } from './crearinventario.page';

const routes: Routes = [
  {
    path: '',
    component: CrearinventarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearinventarioPageRoutingModule {}
