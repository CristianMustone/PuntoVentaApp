import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CartService, CartItem } from '../../services/cart/cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './pago-vuelto.html',
  providers: [CurrencyPipe],
})
export class PayComponent {
  cartItems: CartItem[] = [];
  metodo: string = 'efectivo';

  montoPagado: number = 0;
  vuelto: number = 0;

  codigoTransferencia: string = '';

  constructor(private cartService: CartService) {
    // Suscripción al observable
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items as CartItem[];
    });
  }

  calcularVuelto() {
    if (this.metodo === 'efectivo') {
      this.vuelto = this.montoPagado - this.getTotal();
      if (this.vuelto < 0) this.vuelto = 0;
    }
  }
  getTotal(): number {
    return this.cartService.getTotal();
  }
}
