import { TemplateRef, ViewContainerRef } from "@angular/core";
import { AutentificacionService } from "../services/autenticacion/autenticacion.service";
import { HasRoleDirective } from "./has-role.directive";

describe('HasRoleDirective', () => {
      let mockAuthService: Partial<AutentificacionService>;
      let mockTemplateRef: TemplateRef<any>;
      let mockViewContainerRef: ViewContainerRef;

      beforeEach(() => {
        // Simulación del servicio de autenticación
        mockAuthService = {
          getCurrentUserRole: jasmine.createSpy('getCurrentUserRole').and.returnValue(1), // Retorna un rol de prueba
        };
    
        // Simulaciones de TemplateRef y ViewContainerRef
        mockTemplateRef = {} as TemplateRef<any>;
        mockViewContainerRef = {
          createEmbeddedView: jasmine.createSpy('createEmbeddedView'),
          clear: jasmine.createSpy('clear'),
        } as unknown as ViewContainerRef;
      });


      it('should create an instance', () => {
        const directive = new HasRoleDirective(
          mockAuthService as AutentificacionService,
          mockViewContainerRef,
          mockTemplateRef
        );
        expect(directive).toBeTruthy();
      });
    
      it('should show element if role is allowed', () => {
        const directive = new HasRoleDirective(
          mockAuthService as AutentificacionService,
          mockViewContainerRef,
          mockTemplateRef
        );
    
        directive.appHasRole = [1]; // El rol 1 está permitido
        expect(mockViewContainerRef.createEmbeddedView).toHaveBeenCalledWith(mockTemplateRef);
      });
    
      it('should hide element if role is not allowed', () => {
        const directive = new HasRoleDirective(
          mockAuthService as AutentificacionService,
          mockViewContainerRef,
          mockTemplateRef
        );
    
        directive.appHasRole = [2]; // El rol 1 no está permitido
        expect(mockViewContainerRef.clear).toHaveBeenCalled();
      });
    });