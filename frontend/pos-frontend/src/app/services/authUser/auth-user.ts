import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginResponse {
  refresh: string;
  access: string;
  user: {
    id: number;
    nombre_usuario: string;
    empresa: string;
    puesto: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/users'; // 👈 Ajustá según tu backend
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(nombre_usuario: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login/`, { nombre_usuario, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.isLoggedInSubject.next(true);
        })
      );
  }

  /** 🔹 Logout */
  logout(): Observable<any> {
    const refresh = localStorage.getItem('refresh_token');
    return this.http.post(`${this.apiUrl}/logout/`, { refresh }).pipe(
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.isLoggedInSubject.next(false);
      })
    );
  }

  /** 🔹 Saber si el usuario está logueado */
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  /** 🔹 Getter rápido */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
