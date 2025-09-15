import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Venta, VentasService } from '../../services/sales/sales';

@Component({
  selector: 'app-salestable',
  imports: [MatIconModule, MatButtonModule, MatTableModule, CommonModule],
  templateUrl: './salestable.html',
  styleUrl: './salestable.scss',
})
export class SalesTable implements OnInit {
  displayedColumns: string[] = [
    'fecha',
    'metodo_pago',
    'nro_transferencia',
    'monto_total',
    'pago',
    'vuelto',
    'productos',
  ];
  ventas: Venta[] = [];

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.ventasService.getVentas().subscribe({
      next: (res) => {
        this.ventas = res;
      },
      error: (err) => {
        console.error('Error cargando ventas:', err);
      },
    });
  }
}
