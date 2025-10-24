import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// Esta será la estructura del JSON que nos devuelve el backend
export interface OnlyOfficeConfig {
  type: string;
  documentType: string;
  document: {
    title: string;
    url: string;
    fileType: string;
    key: string;
  };
  editorConfig: {
    user: { id: string; name: string; };
    mode: string;
    callbackUrl: string;
  };
}

const API_URL = 'http://localhost:8090/api/documentos';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private http = inject(HttpClient);

  /**
   * Obtiene la configuración de OnlyOffice para un documento específico
   */
  getConfig(documentoId: string): Observable<OnlyOfficeConfig> {
    return this.http.get<OnlyOfficeConfig>(
      `${API_URL}/${documentoId}/config`,
      { withCredentials: true }
    );
  }
}
