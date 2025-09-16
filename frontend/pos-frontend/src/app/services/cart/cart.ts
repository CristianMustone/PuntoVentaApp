import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../products/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Estado interno del carrito
  private cartItems: Producto[] = [];

  // Observable para que cualquier componente se suscriba
  private cartItemsSubject = new BehaviorSubject<Producto[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  // Agregar producto al carrito
  addToCart(producto: Producto) {
    this.cartItems.push(producto);
    this.cartItemsSubject.next(this.cartItems);
    console.log('Producto agregado al carrito:', this.cartItems);
  }

  // Quitar un producto por código de barras
  removeFromCart(cod_barras: string) {
    this.cartItems = this.cartItems.filter((item) => item.cod_barras !== cod_barras);
    this.cartItemsSubject.next(this.cartItems);
  }

  // Vaciar carrito
  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  // Obtener los productos actuales (sin suscribirse)
  getCartItems(): Producto[] {
    return this.cartItems;
  }
}
