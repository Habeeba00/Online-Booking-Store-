import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const token =
  localStorage.getItem('accessToken')|| sessionStorage.getItem('accessToken');

  if (token !== null) {
    return true;
  } else {
    toastr.error('Please sign in first', 'Authentication Required');
    router.navigate(['/login']);
    return false;
  }
};
