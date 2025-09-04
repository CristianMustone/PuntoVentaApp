import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  inventarioButton() {
    this.router.navigate(['/inventario']);
  }

  reportesButton() {
    this.router.navigate(['/reportes']);
  }

  configuracionButton() {
    this.router.navigate(['/configuracion']);
  }
}
