import { Component } from '@angular/core';
import { Footer } from "../footer/footer";
import { NavbarSimple } from "../navbar-simple/navbar-simple";

@Component({
  selector: 'app-cart-page',
  imports: [Footer, NavbarSimple],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {

}
