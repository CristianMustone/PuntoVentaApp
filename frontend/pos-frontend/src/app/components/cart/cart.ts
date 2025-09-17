import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PayComponent } from '../pago-vuelto/pago-vuelto';
import { CartService, CartItem } from '../../services/cart/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, PayComponent],
  templateUrl: './cart.html',
})
export class CartComponent {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items as CartItem[];
      this.total = this.cartService.getTotal();
    });
  }
  removeFromCart(cod_barras: string) {
    this.cartService.removeFromCart(cod_barras);
  }

  paypage: boolean = false;
  carritoVisible: boolean = false;
  showPay() {
    this.paypage = !this.paypage;
  }

  increaseQuantity(cod_barras: string) {
    this.cartService.increaseQuantity(cod_barras);
  }

  decreaseQuantity(cod_barras: string) {
    this.cartService.decreaseQuantity(cod_barras);
  }
}
