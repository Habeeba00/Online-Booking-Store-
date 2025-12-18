import { Component } from '@angular/core';
import { Footer } from "../footer/footer";
import { RouterModule } from '@angular/router';
import { LandingPage } from "../landing-page/landing-page";
import { Navbar } from "../navbar/navbar";


@Component({
  selector: 'app-dashboard',
  imports: [Footer,RouterModule, LandingPage, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}

