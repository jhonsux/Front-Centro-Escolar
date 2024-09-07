import { Component } from '@angular/core';
import { AlumnoService } from '../shared/alumno.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent {

  alumno = {
    student_id: '',
    name: '',
    firstname: '',
    lastname: '',
    sex: 'O',
    status: 'ACTIVO',
    group_id: 'A',
    semester_id: '1',
    parent_id: ''
  };
  id: any;

  constructor(
    private alumnoService: AlumnoService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.alumnoService.obtenerAlumno(this.id).subscribe(data => {
        this.alumno = data[0];
    })
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

  guardarAlumno() {
    this.alumnoService.obtenerAlumno(this.alumno.student_id).subscribe(
      (alumnoExistente) => {
        if (alumnoExistente) {
          // Si el alumno existe, actualiza
          this.actualizar();
        } else {
          // Si el alumno no existe, crea uno nuevo
          this.crearAlumno();
        }
      },
      (error) => {
        if (error.status === 404) {
          // Si el error es 404, significa que el alumno no existe y se debe crear uno nuevo
          this.crearAlumno();
        } else {
          console.error('Error al buscar el alumno: ', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al buscar el alumno.',
            showConfirmButton: true
          });
        }
      }
    );
  }


  actualizar() {
    this.alumnoService.actualizarAlumno(this.alumno).subscribe(response => {
      console.log('Alumno actualizado: ', response);
      Swal.fire({
        icon: 'success',
        title: 'Alumno Actualizado',
        text: 'El alumno ha sido actualizado con éxito.',
        showConfirmButton: true
      });
      window.history.back();  // Retrocede una página en el historial
    }, error => {
      console.error('Error al actualizar alumno: ', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar el alumno.',
        showConfirmButton: true
      });
    });
  }


  crearAlumno() {
    this.alumnoService.crearAlumno(this.alumno).subscribe(response => {
      console.log('Alumno Creado', response);
      Swal.fire({
        icon: 'success',
        title: 'Alumno Creado',
        text: 'El alumno ha sido creado con éxito.',
        showConfirmButton: true
      });
      this.router.navigate(['/alumnos']);  // Retrocede una página en el historial
    }, error => {
      console.log('Error al crear el Alumno', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el alumno.',
        showConfirmButton: true
      });
    })
  }

  borrarAlumno(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoService.borrarAlumno(id).subscribe(
          data => {
            Swal.fire(
              'Borrado!',
              'El alumno ha sido borrado.',
              'success'
            );
            this.router.navigate(['/alumnos']); // Retrocede una página en el historial
          },
          error => {
            console.error('Error al borrar el alumno', error);
            Swal.fire(
              'Error!',
              'Hubo un error al borrar el alumno.',
              'error'
            );
          }
        );
      }
    });
  }

}
