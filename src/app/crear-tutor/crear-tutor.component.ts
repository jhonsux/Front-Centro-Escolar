import { Component, OnInit } from '@angular/core';
import { TutorService } from '../shared/tutor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-crear-tutor',
  templateUrl: './crear-tutor.component.html',
  styleUrls: ['./crear-tutor.component.css']
})
export class CrearTutorComponent {

  tutor = {
    parent_id: '',
    name: '',
    firstname: '',
    lastname: '',
    adress: '',
    telephone: 'N/A',
    email: 'N/A',
    celphone: 'N/A',
    description: ''
  }
  id = ''

  constructor(private tutorService: TutorService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
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

  guardarTutor() {
    this.tutorService.obtenerTutor(this.tutor.parent_id).subscribe(
      (TutorExistente) => {
        if (TutorExistente) {
          // Si el tuto existe, actualiza
          this.actualizar();
        } else {
          // Si el tutor no existe, crea uno nuevo
          this.crearTutor();
        }
      },
      (error) => {
        if (error.status === 404) {
          // Si el error es 404, significa que el tutor no existe y se debe crear uno nuevo
          this.crearTutor();
        } else {
          console.error('Error al buscar el tutor: ', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al buscar el usuario.',
            showConfirmButton: true
          });
        }
      }
    );
  }

  crearTutor() {
    this.tutorService.crearTutor(this.tutor).subscribe(response => {
      console.log('Tutor Creado', response);
      Swal.fire({
        icon: 'success',
        title: 'Tutor Creado',
        text: 'El tutor ha sido creado con éxito.',
        showConfirmButton: true
      });
      window.history.back();  // Retrocede una página en el historial
    }, error => {
      console.log('Error Al Crear El Tutor', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el tutor.',
        showConfirmButton: true
      });
    })
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
