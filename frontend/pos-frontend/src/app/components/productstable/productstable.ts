import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
  codigo: string;
}

@Component({
  selector: 'app-productstable',
  imports: [MatIconModule, MatButtonModule, MatTableModule],
  templateUrl: './productstable.html',
  styleUrl: './productstable.scss'
})
export class Productstable {
  displayedColumns: string[] = ['nombre', 'precio', 'cantidad', 'codigo', 'editar', 'eliminar'];

  productos: Producto[] = [
    { nombre: 'Producto A', precio: 120, cantidad: 10, codigo: 'A001' },
    { nombre: 'Producto B', precio: 75, cantidad: 20, codigo: 'B002' },
    { nombre: 'Producto C', precio: 50, cantidad: 5, codigo: 'C003' },
  ];

  editarProducto(producto: Producto) {
    console.log('Editar', producto);
  }

  eliminarProducto(producto: Producto) {
    console.log('Eliminar', producto);
  }

}
