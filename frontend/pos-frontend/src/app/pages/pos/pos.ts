import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { ProductComponent } from '../../components/product/product';
import { Searchbarcomponent } from '../../components/searchbar/searchbar';
import { CartComponent } from '../../components/cart/cart';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Producto, ProductosService } from '../../services/products/products';

@Component({
  selector: 'app-pos',
  imports: [
    NavbarComponent,
    ProductComponent,
    Searchbarcomponent,
    CartComponent,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './pos.html',
  styleUrl: './pos.scss',
})
export class PosPage implements OnInit {
  carritoVisible = false;

  toggleCarrito() {
    this.carritoVisible = !this.carritoVisible;
    console.log('Carrito visible:', this.carritoVisible);
  }

  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.getProductos().subscribe({
      next: (res) => {
        this.productos = res;
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
      },
    });
  }
}
