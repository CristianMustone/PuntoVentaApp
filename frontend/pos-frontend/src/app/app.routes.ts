import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { PosPage } from './pages/pos/pos';

export const routes: Routes = [
    {"path": "", component: LoginPage},
    {"path": "dashboard", component: PosPage},
];
