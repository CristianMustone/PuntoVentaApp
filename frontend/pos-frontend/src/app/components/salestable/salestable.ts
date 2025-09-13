import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Producto, ProductosService } from '../../services/products/products';

@Component({
  selector: 'app-salestable',
  imports: [MatIconModule, MatButtonModule, MatTableModule, CommonModule],
  templateUrl: './salestable.html',
  styleUrl: './salestable.scss',
})
export class SalesTable implements OnInit {
  displayedColumns: string[] = ['nombre', 'precio', 'cantidad', 'codigo'];
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (res) => {
        this.productos = res;
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
      },
    });
  }

  editarProducto(producto: Producto) {
    console.log('Editar', producto);
    // Acá más adelante podemos abrir un modal o navegar a un form de edición
  }

  eliminarProducto(producto: Producto) {
    console.log('Eliminar', producto);
    // Acá más adelante conectamos con el servicio DELETE
  }
}
