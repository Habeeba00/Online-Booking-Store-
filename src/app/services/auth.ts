import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChangePasswordRequest, IChangePasswordResponse, IForgetPasswordRequest, IForgetPasswordResponse, ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse, IResetPasswordRequest, IResetPasswordResponse } from '../models/IAuth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _HttpClient = inject(HttpClient);


  onLoginIn(data: ILoginRequest): Observable<ILoginResponse> {
    return this._HttpClient.post<ILoginResponse>('auth/login', data);
  }
  onRegister(userData: IRegisterRequest):Observable<IRegisterResponse>{
    return this._HttpClient.post<IRegisterResponse>('auth/register', userData);
  }

  onForgitPassword(data:IForgetPasswordRequest):Observable<IForgetPasswordResponse>{
    return this._HttpClient.post<IForgetPasswordResponse>('auth/forgot-password',data);
  }

  onResetPassword(data: IResetPasswordRequest): Observable<IResetPasswordResponse> {
    return this._HttpClient.post<IResetPasswordResponse>('auth/reset-password',data);
  }
  onChangePassword(data:IChangePasswordRequest):Observable<IChangePasswordResponse>{
    return this._HttpClient.post<IChangePasswordResponse>('auth/change-password',data)
  }

}
