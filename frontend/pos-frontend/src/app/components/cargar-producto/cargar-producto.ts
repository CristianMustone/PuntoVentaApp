import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/products/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cargar-producto.html',
})
export class CargarProductoComponent {
  producto = {
    nombre_producto: '',
    precio: 0,
    cantidad: 0,
    cod_barras: '',
    activo: true,
  };

  imagen: File | null = null;

  constructor(private productoService: ProductosService, private router: Router) {}

  onFileSelected(event: any) {
    this.imagen = event.target.files[0];
  }

  crearProducto() {
    this.productoService.addProducto(this.producto, this.imagen!).subscribe({
      next: (res) => {
        console.log('Producto creado:', res);
        alert('✅ Producto creado correctamente');
        this.router.navigate(['/inventario']); // redirigir a inventario
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al crear producto');
      },
    });
  }
}
