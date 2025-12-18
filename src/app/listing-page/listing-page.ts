import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Footer } from '../footer/footer';
import { BookService } from '../services/book';
import { IBook, IBookResponse } from '../models/ibook';
import { NavbarSimple } from "../navbar-simple/navbar-simple";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-listing-page',
  imports: [ Footer, NavbarSimple],
  templateUrl: './listing-page.html',
  styleUrl: './listing-page.scss',
})
export class ListingPage implements OnInit {
  books: IBook[] = [];
  page: number = 1;
  hasNext: boolean = false;
  hasPrev: boolean = false;

  private _BookService = inject(BookService);
  private platformId = inject(PLATFORM_ID);


  ngOnInit() {
    // this.getBooks();
    if (isPlatformBrowser(this.platformId)) {
      this.getBooks();
    }
  }

  getBooks() {
    console.log('Calling API with page:', this.page);
    this._BookService.getAllBook(6, this.page).subscribe({
      next: (response: any) => {
        // console.log(response);
        this.books = response.data;
        this.hasNext = response.hasNextPage;
        this.hasPrev = response.hasPrevPage;
      },
      // error(error: any) {
      //   console.log(error);
      // },
      error: (error: any) => {
        console.log('Error fetching books:', error);
        if (error.status === 0) {
          console.log('Network error - please check your internet connection');
          console.log('Network connection issue. Please check your internet and try again.');
        } else {
          console.log('API error:', error.message);
        }
      }
    });
  }

  next() {
    this.page++;
    this.getBooks();
  }

  prev() {
    this.page--;
    this.getBooks();
  }
}
