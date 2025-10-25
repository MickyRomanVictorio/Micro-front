import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Estructura mínima de la configuración simulada
export interface DocumentoSimulado {
  title: string;
  url: string; // URL simulada
  isEditable: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  /**
   * Simula la obtención de la configuración del documento (sin llamar a OnlyOffice)
   */
  getConfigSimulada(documentoId: string, docNombre: string): Observable<DocumentoSimulado> {
    const urlSimulada = `/assets/documentos/${documentoId}.pdf`;

    // Retorna un Observable que emite los datos inmediatamente (of)
    return of({
      title: docNombre,
      url: urlSimulada,
      isEditable: true // Es editable si el estado lo permite
    });
  }
}
