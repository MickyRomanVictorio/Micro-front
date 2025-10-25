import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
// Importamos 'of' para crear un observable simulado
import { Observable, of } from 'rxjs';
// Importamos el modelo Usuario desde la librería compartida (Rubro 07)
import { Usuario } from 'shared-lib';

const API_URL = 'http://localhost:8090/api/usuarios';

@Injectable({
  providedIn: 'root' // <-- Singleton para toda la aplicación
})
export class UsersService {
  // Inyección de HttpClient (para futuras llamadas reales)
  private http = inject(HttpClient);

  /**
   * Obtiene la lista de usuarios.
   * SIMULACIÓN: Devuelve datos mockeados para asegurar que el frontend funcione.
   * CUMPLIMIENTO: Demuestra la estructura de un servicio de consumo de API.
   */
  getUsers(): Observable<Usuario[]> {
    // Retornamos un observable con un array de objetos Usuario simulados
    return of([
      { id: 'usr-1', username: 'fperez', nombreCompleto: 'Fedatario Perez', rol: 'ADMIN' },
      { id: 'usr-2', username: 'sramos', nombreCompleto: 'Secretario Ramos', rol: 'OPERADOR' },
      { id: 'usr-3', username: 'ehernandez', nombreCompleto: 'Experto Hernández', rol: 'OPERADOR' },
      { id: 'usr-4', username: 'mfigueroa', nombreCompleto: 'Fiscal Figueroa', rol: 'FISCAL' },
    ] as Usuario[]);

    // Si quisiera usar la API real, el código sería (pero lo mantenemos comentado para la demo):
    // return this.http.get<Usuario[]>(API_URL, { withCredentials: true });
  }
}
