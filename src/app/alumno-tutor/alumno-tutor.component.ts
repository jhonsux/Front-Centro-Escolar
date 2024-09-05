import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../shared/alumno.service';
import { ActivatedRoute } from '@angular/router';
import { ComunicadoService } from '../shared/comunicado.service';
import { TutorService } from '../shared/tutor.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-alumno-tutor',
  templateUrl: './alumno-tutor.component.html',
  styleUrls: ['./alumno-tutor.component.css']
})
export class AlumnoTutorComponent implements OnInit {

  id = ""
  parent_id = ""
  alumno: any = {};
  tutor: any = {}
  reportes: any[] = [];
  comunicado: any[] = [];
  usuario: any = {}
  user_id = ''
  userRole = '';


  constructor(
    private alumnoService: AlumnoService,
    private comunicadoService: ComunicadoService,
    private authService: AuthService,
    private tutorService: TutorService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user_id = this.authService.getUserId();
    this.usuarioService.obtenerUsuario(this.user_id).subscribe(data => {
      this.usuario = data[0]
    })
    this.id = this.route.snapshot.params['id'];

    this.alumnoService.obtenerAlumno(this.id).subscribe(data => {
      this.alumno = data[0];
      this.parent_id = this.alumno.parent_id;

      this.tutorService.obtenerTutor(this.parent_id).subscribe(data => {
        this.tutor = data[0];
      })

      // Mueve la llamada a obtenerComunicado dentro de la suscripción de obtenerAlumno
      this.comunicadoService.obtenerComunicado(this.parent_id).subscribe(comunicadoData => {
        this.comunicado = comunicadoData;
      });
    });

    // Obtener el rol del usuario y guardarlo en la propiedad
    this.userRole = this.authService.getUserRole();
    console.log(this.userRole)

    // Mantén la llamada a obtenerReportesDeAlumno fuera
    this.alumnoService.obtenerReportesDeAlumno(this.id).subscribe(data => {
      this.reportes = data;
    });

    // Verificar si el token ya está expirado al cargar la aplicación
    if (this.authService.isTokenExpired()) {
      Swal.fire({
        icon: 'warning',
        title: 'Sesión expirada',
        text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.authService.logout();
        // Redirigir a la página de inicio de sesión
        window.location.href = '/login';
      });
    }

  }

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de cerrar sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout(); // Aquí llamas a tu función de logout
        Swal.fire(
          '¡Saliste!',
          'Has cerrado sesión correctamente.',
          'success'
        ).then(() => {
          this.router.navigate(['/inicio']); // Navega a la página de inicio después de cerrar sesión
        });
      }
    });
  }

}
