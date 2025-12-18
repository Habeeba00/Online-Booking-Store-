import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { IBook, IBookResponse } from '../models/ibook';
import { ICategoryResponse } from '../models/icategory';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _HttpClient = inject(HttpClient);


  getAllBook(limit: number,page: number): Observable<IBookResponse> {
    return this._HttpClient.get<IBookResponse>(`book?limit=${limit}&page=${page}`);
  }


  getAllCategory(): Observable<ICategoryResponse> {
    return this._HttpClient.get<ICategoryResponse>(`category`);
  }


  getBookById(id: string): Observable<IBook> {
    return this._HttpClient.get<IBook>(`book/${id}`);
  }

}
