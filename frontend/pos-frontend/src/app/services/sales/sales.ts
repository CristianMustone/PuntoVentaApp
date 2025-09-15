import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Venta {
  id: number;
  fecha: string;
  cliente: string;
  total: number;
  // 👆 agregá todos los campos que tenga tu serializer
}

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private apiUrl = 'http://127.0.0.1:8000/api/ventas/'; // ajusta según tu ruta en Django

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access'); // 👈 así guardaste el JWT en login
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // 📌 Obtener todas las ventas
  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl, { headers: this.getHeaders() });
  }
}
