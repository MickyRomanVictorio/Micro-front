import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Caso } from 'shared-lib';

// Imports de Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-casos-tabla',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './casos-tabla.component.html',
  styleUrl: './casos-tabla.component.scss'
})
export class CasosTablaComponent {

  @Input() casos: Caso[] = []; // Recibe la lista de casos
  @Output() casoSeleccionado = new EventEmitter<Caso>(); // Emite el caso seleccionado

  displayedColumns: string[] = ['nuc', 'titulo', 'estado', 'acciones'];

  seleccionarCaso(caso: Caso) {
    // Emite el evento para que el "Container" lo escuche
    this.casoSeleccionado.emit(caso);
  }
}
