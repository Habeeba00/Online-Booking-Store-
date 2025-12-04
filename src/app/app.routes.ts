import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'dashboard',loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),},
  {path: 'login', loadComponent: () => import('./login/login').then((m) => m.Login) },
  {path: 'register', loadComponent: () => import('./register/register').then((m) => m.Register) },
  {path: 'forget-password',loadComponent: () => import('./forget-password/forget-password').then((m) => m.ForgetPassword),},
  {path: 'reset-password',loadComponent: () => import('./reset-password/reset-password').then((m) => m.ResetPassword),},
  {path: 'change-password',loadComponent: () => import('./change-password/change-password').then((m) => m.ChangePassword),},
];
