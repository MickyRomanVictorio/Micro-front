import { Routes } from '@angular/router';
import { BandejaCasosComponent } from './components/bandeja-casos/bandeja-casos.component';

// Estas son las rutas QUE SERÁN EXPUESTAS
export const routes: Routes = [
  {
    path: '', // Cuando el shell nos llame, esta será la ruta por defecto
    component: BandejaCasosComponent
  }
];
