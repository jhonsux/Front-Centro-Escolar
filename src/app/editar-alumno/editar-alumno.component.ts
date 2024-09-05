import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from '../shared/alumno.service';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {

  id = ""
  alumno: any = {}

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
            window.history.back();  // Retrocede una página en el historial
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
