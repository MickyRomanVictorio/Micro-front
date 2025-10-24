import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Caso, AuthService } from 'shared-lib';
import { EMPTY, Observable, switchMap } from 'rxjs';

const API_URL = 'http://localhost:8090/api/casos';

@Injectable({
  providedIn: 'root'
})
export class CasosService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  /**
   * Obtiene la bandeja de casos (pendientes) para el fiscal logueado.
   */
  getBandeja(): Observable<Caso[]> {
    // Obtenemos el usuario actual del servicio compartido
    const fiscal = this.authService.currentUserValue;

    if (!fiscal) {
      console.error('No hay fiscal logueado para pedir la bandeja');
      return EMPTY; // Devuelve un observable vacío si no hay usuario
    }

    // Llamamos al endpoint del backend: GET /api/casos/bandeja/{fiscalId}
    return this.http.get<Caso[]>(
      `${API_URL}/bandeja/${fiscal.id}`,
      { withCredentials: true }
    );
  }
}
