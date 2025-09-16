import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Producto } from '../../services/products/products';
import { CartService } from '../../services/cart/cart';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './product.html',
})
export class ProductComponent {
  @Input() producto!: Producto;

  constructor(private cartService: CartService) {}

  addToCart(producto: Producto) {
    this.cartService.addToCart(producto);
  }
}
