import { Routes } from '@angular/router';
// Importamos el componente principal de este MFE
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

// Estas son las rutas que se expondrán al Host
export const routes: Routes = [
  {
    // Cuando el Host navegue a /admin, esta ruta (la raíz del MFE) se activará
    path: '',
    component: AdminDashboardComponent
  }
];

