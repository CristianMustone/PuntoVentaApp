import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { ProductComponent } from '../../components/product/product';

@Component({
  selector: 'app-pos',
  imports: [NavbarComponent, ProductComponent],
  templateUrl: './pos.html',
  styleUrl: './pos.scss',
})
export class PosPage {}
