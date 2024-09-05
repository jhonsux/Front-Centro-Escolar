import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AlumnoModelV } from '../shared/alumno.model';
import { AlumnoService } from '../shared/alumno.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {

  //alumnos: Observable<AlumnoModel[]> | undefined
  criterio: string = ''
  alumnos: any[] = []
  alumnoSeleccionado: string = '';
  usuario: any = {}
  user_id = ''
  userRole = '';

  alumnosPorSemestre$: Observable<{ [semestre: string]: AlumnoModelV[] }> | undefined;

  private semestreOrden: { [key: string]: number } = {
    'PRIMER': 1,
    'SEGUNDO': 2,
    'TERCER': 3,
    'CUARTO': 4,
    'QUINTO': 5,
    'SEXTO': 6
  };



  constructor(
    private alumnoService: AlumnoService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.user_id = this.authService.getUserId();
    this.usuarioService.obtenerUsuario(this.user_id).subscribe(data => {
      this.usuario = data[0]
    })

    // Obtener el rol del usuario y guardarlo en la propiedad
    this.userRole = this.authService.getUserRole();
    console.log(this.userRole)

    this.alumnosPorSemestre$ = this.alumnoService.obtenerAlumnos().pipe(
      map((alumnos: AlumnoModelV[]) => {
        return alumnos.reduce((acc, alumno) => {
          const semestre = alumno.semestre;
          if (!acc[semestre]) {
            acc[semestre] = [];
          }
          acc[semestre].push(alumno);
          return acc;
        }, {} as { [key: string]: AlumnoModelV[] });
      })
    );

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

  getSemestres(alumnosPorSemestre: { [semestre: string]: AlumnoModelV[] }): string[] {
    const semestres = Object.keys(alumnosPorSemestre);
    // Ordenar los semestres numéricamente
    return semestres.sort((a, b) => this.semestreOrden[a] - this.semestreOrden[b]);
  }

  buscarAlumno() {
    this.alumnoService.buscarAlumno(this.criterio).subscribe(
      data => {
        this.alumnos = data;

        // Verifica si el resultado está vacío
        if (this.alumnos.length === 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Alumno no encontrado',
            text: 'No se encontró ningún alumno con ese nombre.',
            confirmButtonText: 'OK'
          });
        }
      },
      error => {
        if (error.status === 404) {
          // Muestra el mensaje de alumno no encontrado
          Swal.fire({
            icon: 'warning',
            title: 'Alumno no encontrado',
            text: 'No se encontró ningún alumno con ese nombre.',
            confirmButtonText: 'OK'
          });
        } else {
          // Muestra un mensaje de error general
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al buscar al alumno. Inténtalo de nuevo más tarde.',
            confirmButtonText: 'OK'
          });
        }
      }
    );
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
