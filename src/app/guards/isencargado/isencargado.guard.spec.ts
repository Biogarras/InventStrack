import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { IsEncargadoGuard } from './isencargado.guard';
import { IsTiendaGuard } from '../istienda/istienda.guard';
import { AutentificacionService } from 'src/app/services/autenticacion/autenticacion.service';

describe('IsTiendaGuard', () => {
  let guard: IsTiendaGuard;
  let mockAuthService: jasmine.SpyObj<AutentificacionService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let routeSnapshot: ActivatedRouteSnapshot;
  let stateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AutentificacionService', ['getCurrentUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        IsTiendaGuard,
        { provide: AutentificacionService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(IsTiendaGuard);
    mockAuthService = TestBed.inject(AutentificacionService) as jasmine.SpyObj<AutentificacionService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Simular ActivatedRouteSnapshot y RouterStateSnapshot
    routeSnapshot = {} as ActivatedRouteSnapshot;
    stateSnapshot = {} as RouterStateSnapshot;
  });

  it('Debe permitir acceso si el usuario tiene role_id 2  (Tienda)', () => {
    mockAuthService.getCurrentUser.and.returnValue({ usuario_id: '1', role_id: 2 });

    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBeTrue();
    expect(mockAuthService.getCurrentUser).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('Debe denegar acceso si el usuario no tiene role_id 2', () => {
    mockAuthService.getCurrentUser.and.returnValue({ usuario_id: '1', role_id: 2 });

    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBeFalse();
    expect(mockAuthService.getCurrentUser).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  it('Debe denegar acceso si no hay usuario autenticado', () => {
    mockAuthService.getCurrentUser.and.returnValue(null);

    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBeFalse();
    expect(mockAuthService.getCurrentUser).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });
});
