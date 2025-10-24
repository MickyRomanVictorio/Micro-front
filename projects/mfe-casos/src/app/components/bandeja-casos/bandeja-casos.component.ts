import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Caso, MessageBusService } from 'shared-lib';
import { CasosService } from '../../services/casos.service';

// Imports para el HTML
import { AsyncPipe, CommonModule } from '@angular/common';
import { CasosTablaComponent } from '../casos-tabla/casos-tabla.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bandeja-casos',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    CasosTablaComponent
  ],
  templateUrl: './bandeja-casos.component.html',
  styleUrl: './bandeja-casos.component.scss'
})
export class BandejaCasosComponent implements OnInit {

  private casosService = inject(CasosService);
  private messageBus = inject(MessageBusService);
  private router = inject(Router);

  public casos$!: Observable<Caso[]>;

  ngOnInit(): void {
    // 1. (SMART) Llama al servicio para obtener los datos
    this.casos$ = this.casosService.getBandeja();
  }

  /**
   * (SMART) Maneja el evento emitido por el componente de presentación
   * @param caso El caso que el usuario seleccionó
   */
  onCasoSeleccionado(caso: Caso): void {
    console.log('Caso seleccionado:', caso);

    this.messageBus.publish('CASO_SELECCIONADO', caso);
    this.router.navigate(['/documentos']);
  }
}
