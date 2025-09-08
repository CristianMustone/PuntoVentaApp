import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './product.html',
})
export class ProductComponent {}
