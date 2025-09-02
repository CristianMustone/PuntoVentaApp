import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule, // Necesario para *ngFor, *ngIf
    MatToolbarModule, // Para <mat-toolbar>
    MatButtonModule, // Para <button mat-button>
    MatTableModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('pos-frontend');
  products = [
    { name: 'Producto A', stock: 20 },
    { name: 'Producto B', stock: 10 },
    { name: 'Producto C', stock: 5 },
  ];
}
