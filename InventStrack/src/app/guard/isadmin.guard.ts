import { CanActivateFn } from '@angular/router';

export const isadminGuard: CanActivateFn = (route, state) => {
  return true;
};
