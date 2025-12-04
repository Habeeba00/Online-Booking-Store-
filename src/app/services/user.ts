import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private http = inject(HttpClient);

  createUser(userData:RegisterRequest): Observable<RegisterRequest> {
    return this.http.post<RegisterRequest>('register', userData);
  }
}
