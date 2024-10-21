import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`, // Usa el router-outlet en la plantilla
  standalone: true,
  imports: [RouterModule], // Importa RouterModule aquí
})
export class AppComponent {}