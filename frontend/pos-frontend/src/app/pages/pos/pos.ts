import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { ProductComponent } from '../../components/product/product';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartComponent } from '../../components/cart/cart';

@Component({
  selector: 'app-pos',
  imports: [NavbarComponent, ProductComponent, MatIconModule, MatButtonModule],
  templateUrl: './pos.html',
  styleUrl: './pos.scss',
})
export class PosPage {}
