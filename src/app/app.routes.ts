import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', loadComponent: () => import('./login/login').then((m) => m.Login) },
  {path: 'register', loadComponent: () => import('./register/register').then((m) => m.Register) },
  {path: 'forget-password',loadComponent: () => import('./forget-password/forget-password').then((m) => m.ForgetPassword),},
  {path: 'reset-password',loadComponent: () => import('./reset-password/reset-password').then((m) => m.ResetPassword),},
  {path: 'change-password',canActivate: [authGuard],
    loadComponent: () => import('./change-password/change-password').then((m) => m.ChangePassword),},
  {path: 'dashboard',canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),},
  {path: 'listing-page', loadComponent: () => import('./listing-page/listing-page').then((m) => m.ListingPage) },
  {path: 'cart-page', loadComponent: () => import('./cart-page/cart-page').then((m) => m.CartPage) },

  ];
