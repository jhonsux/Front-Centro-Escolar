import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  // username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        Swal.fire({
          icon: 'success',
          title: 'Inicio Correcto',
          text: '¡Bienvenido!',
          showConfirmButton: true
        }).then(() => {
          this.router.navigate(['/menu']); // Usar Router en lugar de window.location.href
        });
      },
      error => {
        console.error('Error al iniciar sesión', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos.',
          showConfirmButton: true
        });
      }
    );
  }

  registrar() {
    window.location.href = '/usuarios/crear'
  }

}
