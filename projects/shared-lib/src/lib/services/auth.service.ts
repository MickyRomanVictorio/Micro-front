import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';

// DTO del Backend (no lo exportamos)
interface LoginRequest {
  username: string;
  password: string;
}

const API_URL = 'http://localhost:8090/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  // BehaviorSubject para mantener el estado del usuario en toda la app
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Al iniciar, intentar cargar al usuario desde localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(
          `${API_URL}/login`,
          { username, password },
          { withCredentials: true }
        ).pipe(
            tap(usuario => {
              localStorage.setItem('currentUser', JSON.stringify(usuario));
              this.currentUserSubject.next(usuario);
            })
          );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
