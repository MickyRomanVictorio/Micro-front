import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Caso, Documento, MessageBusService } from 'shared-lib';
import { DocumentoService, DocumentoSimulado } from '../../services/documento.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // Importamos el módulo
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editor-documento',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './editor-documento.component.html',
  styleUrl: './editor-documento.component.scss'
})
export class EditorDocumentoComponent implements OnInit, OnDestroy {

  private messageBus = inject(MessageBusService);
  private documentoService = inject(DocumentoService);
  private busSubscription: Subscription | undefined;

  documentoData: DocumentoSimulado | undefined;
  casoSeleccionado: Caso | null = null;

  // URL simulada del Document Server para mostrar en la demo
  documentServerUrl = 'Integración SIMULADA: OnlyOffice Docs Cloud';

  ngOnInit(): void {
    // Nos suscribimos al evento del MessageBus (ReplaySubject)
    this.busSubscription = this.messageBus.listen<Caso>('CASO_SELECCIONADO')
      .subscribe(caso => {
        this.casoSeleccionado = caso;
        this.cargarDocumentoSimulado(caso);
      });
  }

  cargarDocumentoSimulado(caso: Caso): void {
    if (!caso.documentos || caso.documentos.length === 0) {
      this.documentoData = undefined;
      return;
    }

    const primerDocumento: Documento = caso.documentos[0];

    // 1. Llamar al servicio simulado (simula la llamada al backend)
    this.documentoService.getConfigSimulada(primerDocumento.id, primerDocumento.nombreArchivo).subscribe(data => {
      this.documentoData = data;
    });
  }

  simularGuardado(): void {
    // Aquí se demostraría la función de Microfrontend: publicar un evento
    // que el Host o el MFE de Casos podría usar para cambiar el estado.
    alert('Documento guardado y listo para cambiar de estado en el proceso fiscal.');
  }

  ngOnDestroy(): void {
    this.busSubscription?.unsubscribe();
  }
}
