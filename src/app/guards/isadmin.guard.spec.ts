import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { Inject } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { isadminGuard } from './isadmin.guard';
import { inject } from '@angular/core';

describe('isadminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isadminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
