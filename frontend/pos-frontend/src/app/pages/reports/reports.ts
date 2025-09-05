import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { Productstable } from '../../components/productstable/productstable';

@Component({
  selector: 'app-reports',
  imports: [NavbarComponent,Productstable],
  templateUrl: './reports.html',
  styleUrl: './reports.scss'
})
export class Reports {

}
