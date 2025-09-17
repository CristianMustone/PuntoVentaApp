import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../products/products';

export interface CartItem extends Producto {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Estado interno del carrito
  private cartItems: CartItem[] = [];

  // Observable para que cualquier componente se suscriba
  private cartItemsSubject = new BehaviorSubject<Producto[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  // Agregar producto al carrito
  addToCart(producto: Producto, quantity: number = 1) {
    const existingItem = this.cartItems.find((item) => item.cod_barras === producto.cod_barras);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ ...producto, quantity });
    }

    this.cartItemsSubject.next(this.cartItems);
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

  // Reducir cantidad (si llega a 0, eliminar)
  decreaseQuantity(cod_barras: string) {
    const item = this.cartItems.find((i) => i.cod_barras === cod_barras);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeFromCart(cod_barras);
      } else {
        this.cartItemsSubject.next(this.cartItems);
      }
    }
  }

  // Aumentar cantidad
  increaseQuantity(cod_barras: string) {
    const item = this.cartItems.find((i) => i.cod_barras === cod_barras);
    if (item) {
      item.quantity++;
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  // Calcular total
  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + Number(item.precio) * item.quantity, 0);
  }
}
