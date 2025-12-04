import { HttpInterceptorFn } from '@angular/common/http';

const baseUrl = 'https://upskilling-egypt.com:3007/api/auth/';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {

  const clonedReq=req.clone({
    url:baseUrl+req.url
  });
  return next(clonedReq);
};
