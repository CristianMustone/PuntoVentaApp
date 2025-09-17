import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CartService, CartItem } from '../../services/cart/cart';
import { CurrencyPipe } from '@angular/common';
import { VentasService, Venta } from '../../services/sales/sales';
import { AuthService, LoginResponse } from '../../services/authUser/auth-user';

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
  empresaUsuario: string = '';

  constructor(private cartService: CartService, private ventaService: VentasService) {
    // Suscripción al observable
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items as CartItem[];
    });

    // 🔹 Recuperar la empresa del usuario logueado desde localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData) as LoginResponse['user'];
      this.empresaUsuario = user.empresa;
    }
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

  confirmarPago() {
    const venta: Venta = {
      metodo_pago: this.mapMetodoPago(this.metodo),
      nro_transferencia: this.metodo !== 'efectivo' ? this.codigoTransferencia : null,
      monto_total: this.getTotal(),
      pago: this.metodo === 'efectivo' ? this.montoPagado : 0,
      vuelto: this.metodo === 'efectivo' ? this.vuelto : 0,
      empresa: this.empresaUsuario,
      productos: this.cartItems.map((item) => ({
        cod_barras: item.cod_barras, // 🔹 usamos cod_barras en lugar de id
        cantidad: item.quantity,
        precio_unitario: item.precio,
      })),
    };
    console.log(venta);

    this.ventaService.addVenta(venta).subscribe({
      next: (res) => {
        alert('✅ Venta registrada con éxito');
        this.cartService.clearCart(); // limpiar carrito
      },
      error: (err) => {
        alert('❌ Error al registrar la venta');
      },
    });
  }

  private mapMetodoPago(frontMetodo: string): string {
    switch (frontMetodo) {
      case 'efectivo':
        return 'EF';
      case 'debito':
        return 'DB';
      case 'credito':
        return 'CR';
      case 'mercadopago':
        return 'MP';
      case 'transferencia':
        return 'TR';
      default:
        return 'EF';
    }
  }
}
