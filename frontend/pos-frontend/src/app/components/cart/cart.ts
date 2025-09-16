import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PayComponent } from '../pago-vuelto/pago-vuelto';
import { CartService } from '../../services/cart/cart';
import { Producto } from '../../services/products/products';

// export interface CartItem extends Product {
//   quantity: number;
// }

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, PayComponent],
  templateUrl: './cart.html',
})
export class CartComponent {
  paypage: boolean = false;
  carritoVisible: boolean = false;
  showPay() {
    this.paypage = !this.paypage;
  }
}
