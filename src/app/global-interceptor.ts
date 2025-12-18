import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

const baseUrl = 'https://upskilling-egypt.com:3007/api/';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {


  const platformId = inject(PLATFORM_ID);
  let token: string | null = null;

  if(isPlatformBrowser(platformId)){
    token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  }
  const clonedReq=req.clone({
    url:baseUrl+req.url,
    setHeaders: token ? {
      Authorization: `Bearer ${token}`
    } : {}
  });
  return next(clonedReq);
};
