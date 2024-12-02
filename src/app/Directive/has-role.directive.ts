import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AutentificacionService } from '../services/autenticacion/autenticacion.service';

@Directive({
  selector: '[appHasRole]' // Nombre de la directiva para usar en el HTML
})
export class HasRoleDirective {
  private currentRole: any;

  constructor(
    private authService: AutentificacionService, // Servicio de autenticación
    private viewContainer: ViewContainerRef, // Para mostrar/ocultar el contenido
    private templateRef: TemplateRef<any> // Plantilla del elemento donde se aplica la directiva
  ) {
    this.currentRole = this.authService.getCurrentUserRole(); // Obtener el rol actual
  }

  @Input() set appHasRole(allowedRoles: number[]) {
    if (allowedRoles.includes(this.currentRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef); // Muestra el elemento
    } else {
      this.viewContainer.clear(); // Oculta el elemento
    }
  }
}
