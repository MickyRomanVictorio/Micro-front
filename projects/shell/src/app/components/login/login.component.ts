import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'shared-lib';

// Imports de Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['fperez', Validators.required], // Pre-llenado para el demo
    password: ['123456', Validators.required]  // Pre-llenado para el demo
  });

  errorMessage: string | null = null;

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username!, password!)
      .subscribe({
        next: (usuario) => {
          console.log('Login exitoso:', usuario);
          this.router.navigate(['/']); // Redirige a la bandeja
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        }
      });
  }
}
