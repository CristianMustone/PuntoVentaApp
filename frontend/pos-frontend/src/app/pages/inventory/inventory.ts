import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Searchbarcomponent } from '../../components/searchbar/searchbar';
import { NavbarComponent } from '../../components/navbar/navbar';
import { Productstable } from '../../components/productstable/productstable';
import { CargarProductoComponent } from '../../components/cargar-producto/cargar-producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    Searchbarcomponent,
    NavbarComponent,
    Productstable,
    CargarProductoComponent,
    CommonModule,
  ],
  templateUrl: './inventory.html',
})
export class InventoryPage {
  cargarproducto: boolean = false;

  agregarProducto() {
    this.cargarproducto = !this.cargarproducto;
  }
}
