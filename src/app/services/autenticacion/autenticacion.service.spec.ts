import { TestBed } from '@angular/core/testing';

import { AutentificacionService } from './autenticacion.service';

describe('AutenticacionService', () => {
  let service: AutentificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
