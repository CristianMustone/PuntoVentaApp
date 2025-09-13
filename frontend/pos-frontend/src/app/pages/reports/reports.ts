import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FewProducts } from '../../components/fewproducts/fewproducts';
import { SalesTable } from '../../components/salestable/salestable';

@Component({
  selector: 'app-reports',
  imports: [NavbarComponent, MatButtonModule, CommonModule, FewProducts, SalesTable],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports {
  reportTpype: string = 'ventas';

  ventasReports() {
    this.reportTpype = 'ventas';
    console.log(this.reportTpype);
  }

  stockReports() {
    this.reportTpype = 'stock';
    console.log(this.reportTpype);
  }
}
