import { Routes } from '@angular/router';
import { LoginPage } from './page/login/login.component';
import { AdminComponent } from './page/admin/admin.component';
import { GestionUsuarioComponent } from './page/admin/gestion-usuario/gestion-usuario.component';
import { GestionTiendaComponent} from './page/admin/gestion-tienda/gestion-tienda.component'
import { GestionProductoComponent } from './page/admin/gestion-producto/gestion-producto.component';
import { GestionInventarioComponent } from './page/admin/gestion-inventario/gestion-inventario.component';

// Definición de las rutas de la aplicación
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirigir al login por defecto
  { path: 'login', component: LoginPage },
  { 
    path: 'admin', 
    component: AdminComponent,
    children: [
      { path: 'gestion-usuario', component: GestionUsuarioComponent },
      { path: 'gestion-tienda', component: GestionTiendaComponent },
      { path: 'gestion-producto', component: GestionProductoComponent },
      { path: 'gestion-inventario', component: GestionInventarioComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }  // Redirección en caso de ruta no encontrada
];