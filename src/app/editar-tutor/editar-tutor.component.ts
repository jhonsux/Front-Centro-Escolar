import { Component, OnInit } from '@angular/core';
import { TutorService } from '../shared/tutor.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-editar-tutor',
  templateUrl: './editar-tutor.component.html',
  styleUrls: ['./editar-tutor.component.css']
})
export class EditarTutorComponent implements OnInit {

  id = ""
  tutor: any = {}

  constructor(
    private tutorService: TutorService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.tutorService.obtenerTutor(this.id).subscribe(data => {
        this.tutor = data[0];
        console.log(this.tutor)
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
    this.tutorService.actualizarTutor(this.tutor).subscribe(response => {
      console.log('Tutor actualizado: ', response);
      Swal.fire({
        icon: 'success',
        title: 'Tutor Actualizado',
        text: 'El tutor ha sido actualizado con éxito.',
        showConfirmButton: true
      });
      window.history.back();  // Retrocede una página en el historial
    }, error => {
      console.error('Error al actualizar Tutor: ', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar el tutor.',
        showConfirmButton: true
      });
    });
  }

  borrarTutor(id: string) {
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
      this.tutorService.borrarTutor(id).subscribe(
        data => {
          Swal.fire(
            'Borrado!',
            'El tutor ha sido borrado.',
            'success'
          );
          window.history.back();  // Retrocede una página en el historial
        },
        error => {
          console.error('Error al borrar el tutor', error);
          Swal.fire(
            'Error!',
            'Hubo un error al borrar el tutor.',
            'error'
          );
        }
      );
    }
  });
  }

}
