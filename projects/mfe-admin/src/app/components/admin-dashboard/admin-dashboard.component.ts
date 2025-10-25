import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'shared-lib'; // <-- Reutilizamos el modelo (Rubro 07)
import { UsersService } from '../../services/users.service'; // <-- Servicio creado

// Imports de Material
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MatTableModule, // Importamos el módulo de la tabla
    MatCardModule   // Importamos el módulo de la tarjeta
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  private usersService = inject(UsersService);

  // Variable reactiva que contendrá la lista de usuarios
  public users$!: Observable<Usuario[]>;

  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['nombreCompleto', 'username', 'rol', 'id'];

  ngOnInit(): void {
    // 1. Al iniciar, llamamos al servicio para obtener los datos
    this.users$ = this.usersService.getUsers();
  }
}
