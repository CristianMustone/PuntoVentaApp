import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductComponent } from '../product/product';

// export interface CartItem extends Product {
//   quantity: number;
// }

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, ProductComponent],
  templateUrl: './cart.html',
})
export class CartComponent {}
