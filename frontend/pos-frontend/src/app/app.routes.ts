import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { PosPage } from './pages/pos/pos';
import { Inventory } from './pages/inventory/inventory';
import { Settings } from './pages/settings/settings';
import { Reports } from './pages/reports/reports';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'dashboard', component: PosPage },
  { path: 'inventario', component: Inventory },
  { path: 'reportes', component: Settings },
  { path: 'configuracion', component: Reports },
];
