import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-searchbar',
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss'
})
export class Searchbarcomponent {

}
