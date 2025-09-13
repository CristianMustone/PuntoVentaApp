import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Producto } from '../../services/products/products';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './product.html',
})
export class ProductComponent {
  @Input() producto!: Producto;
}
