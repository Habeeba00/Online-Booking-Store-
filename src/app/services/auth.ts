import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _HttpClient = inject(HttpClient);

  onSignIn(data:LoginResponse): Observable<LoginResponse> {
    return this._HttpClient.post<LoginResponse>('login', data);
  }
}
