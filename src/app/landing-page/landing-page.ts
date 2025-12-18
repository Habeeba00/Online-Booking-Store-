import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IBook, IBookResponse } from '../models/ibook';
import { BookService } from '../services/book';
import { RouterLink } from "@angular/router";
import { ICategory, ICategoryResponse } from '../models/icategory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [CarouselModule, RouterLink,CommonModule ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage implements OnInit {
  books: IBook[] = [];
  categories: ICategory[] = [];
  featuredBook: IBook | null = null;

  categoryImages: string[] = [
    'images/Rectangle 11.png',
    'images/Rectangle 11 (1).png',
    'images/Rectangle 11 (2).png',
    'images/Rectangle 11.png',
    'images/Rectangle 11 (1).png',
    'images/Rectangle 11 (2).png',
    'images/Rectangle 11.png',
    'images/Rectangle 11 (1).png',
    'images/Rectangle 11 (2).png',
  ];


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    navSpeed: 700,
    // navText: ['←', '→'],
    items: 1,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: false,
    navSpeed: 700,
    autoplay: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  }

  booksOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    navSpeed: 700,
    autoplay: false,
    margin: 30,
    items: 4,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  }


  private _BookService = inject(BookService);

  ngOnInit() {
    this.getBooks();
    this.getCategory();
  }

  getBooks() {
    this._BookService.getAllBook(14, 1).subscribe({
      next: (response: IBookResponse) => {
        this.books = response.data;

        if (this.books.length > 0) {
          this.featuredBook = this.books[0];
        }
      },
      error: (error: any) => {
        console.log('Error:', error);

        let errorMsg = '';

        if (error.error?.message) {
          errorMsg = Array.isArray(error.error.message)
            ? error.error.message[0]
            : error.error.message;
        }
        console.log(errorMsg);
      }
    });
  }


  getCategory() {
    this._BookService.getAllCategory().subscribe({
      next: (response: ICategoryResponse) => {
        this.categories = response;
      },
      error: (error: any) => {
        console.log('Error fetching categories:', error);

        let errorMsg = '';

        if (error.error?.message) {
          errorMsg = Array.isArray(error.error.message)
            ? error.error.message[0]
            : error.error.message;
        }
        console.log('Error message:', errorMsg);
      }
    });
  }

  getOneBook(bookId:string){
    this._BookService.getBookById(bookId).subscribe({
      next: (response: IBook) => {
        this.featuredBook = response;
        // console.log('Featured book fetched:', response);
      },
      error: (error: any) => {
        console.log('Error fetching featured book:', error);
      }

    })
  }

}
