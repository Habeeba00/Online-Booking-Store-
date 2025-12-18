import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar-simple',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule ],
  templateUrl: './navbar-simple.html',
  styleUrl: './navbar-simple.scss',
})
export class NavbarSimple {

}
