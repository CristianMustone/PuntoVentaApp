import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  cod_barras: string;
  nombre_producto: string;
  cantidad: number;
  precio: number;
  activo: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'http://localhost:8000/api/productos'; // 👈 ajusta si usás otra ruta base

  constructor(private http: HttpClient) {}

  // 1️⃣ Obtener todos los productos activos
  getProductos(): Observable<Producto[]> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Producto[]>(`${this.apiUrl}/`, { headers });
  }

  // 2️⃣ Obtener productos con stock bajo
  getProductosStockBajo(limite: number = 10): Observable<Producto[]> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Producto[]>(`${this.apiUrl}/stock-bajo/?limite=${limite}`, { headers });
  }

  // 3️⃣ Editar producto por código de barras
  updateProducto(cod_barras: string, producto: Partial<Producto>): Observable<Producto> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<Producto>(`${this.apiUrl}/editar/${cod_barras}/`, producto, { headers });
  }

  // 4️⃣ Eliminar producto por código de barras (soft delete)
  deleteProducto(cod_barras: string): Observable<any> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/eliminar/${cod_barras}/`, { headers });
  }

  // 5️⃣ Agregar nuevo producto
  addProducto(producto: Producto, imagen?: File): Observable<Producto> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = new FormData();
    formData.append('nombre_producto', producto.nombre_producto);
    formData.append('precio', producto.precio.toString());
    formData.append('cantidad', producto.cantidad.toString());
    formData.append('cod_barras', producto.cod_barras);
    formData.append('activo', producto.activo.toString()); // nuevo producto siempre activo

    if (imagen) {
      formData.append('imagen1', imagen); // usamos imagen1 como en tu modelo
    }

    return this.http.post<Producto>(`${this.apiUrl}/crear/`, formData, { headers });
  }
}
