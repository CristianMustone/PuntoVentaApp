import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { ProductComponent } from '../../components/product/product';
import { Searchbarcomponent } from '../../components/searchbar/searchbar';

@Component({
  selector: 'app-pos',
  imports: [NavbarComponent, ProductComponent, Searchbarcomponent],
  templateUrl: './pos.html',
  styleUrl: './pos.scss',
})
export class PosPage {}
