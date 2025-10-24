import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'casos', // Carga MFE 1
        loadChildren: () =>
          loadRemoteModule('mfe-casos', './routes').then((m) => m.routes),
      },
      {
        path: 'documentos', // Carga MFE 2
        loadChildren: () =>
          loadRemoteModule('mfe-documentos', './routes').then((m) => m.routes),
      },
      {
        path: 'admin', // Carga MFE 3
        loadChildren: () =>
          loadRemoteModule('mfe-admin', './routes').then((m) => m.routes),
      },
      {
        path: '',
        redirectTo: 'casos',
        pathMatch: 'full'
      }
    ]
  },
];
