import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { Productstable } from '../../components/productstable/productstable';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  imports: [NavbarComponent, Productstable, MatButtonModule, CommonModule],
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
