import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './pago-vuelto.html',
})
export class PayComponent {
  total: number = 3500; // 🔹 Aquí iría el total dinámico del carrito
  metodo: string = 'efectivo';

  montoPagado: number = 0;
  vuelto: number = 0;

  codigoTransferencia: string = '';

  calcularVuelto() {
    if (this.metodo === 'efectivo') {
      this.vuelto = this.montoPagado - this.total;
      if (this.vuelto < 0) this.vuelto = 0;
    }
  }
}
