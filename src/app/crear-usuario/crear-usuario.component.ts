import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {

  constructor( private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  id = ""
  usuario: any = {}

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']
    this.usuarioService.obtenerUsuario(this.id).subscribe(data => {
        this.usuario = data[0];
        console.log(this.usuario)
    })
// Verificar si el token ya está expirado al cargar la aplicación
    // if (this.authService.isTokenExpired()) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Sesión expirada',
    //     text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
    //     confirmButtonText: 'Aceptar'
    //   }).then(() => {
    //     this.authService.logout();
    //     // Redirigir a la página de inicio de sesión
    //     window.location.href = '/login';
    //   });
    // }
  }

  guardarUsuario() {
    this.usuarioService.obtenerUsuario(this.usuario.user_id).subscribe(
      (usuarioExistente) => {
        if (usuarioExistente) {
          // Si el usuario existe, actualiza
          this.actualizar();
        } else {
          // Si el usuario no existe, crea uno nuevo
          this.crearUsuario();
        }
      },
      (error) => {
        if (error.status === 404) {
          // Si el error es 404, significa que el usuario no existe y se debe crear uno nuevo
          this.crearUsuario();
        } else {
          console.error('Error al buscar el usuario: ', error);
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

  actualizar() {
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(response => {
      console.log('Usuario actualizado: ', response);
      Swal.fire({
        icon: 'success',
        title: 'Usuario Actualizado',
        text: 'El usuario ha sido actualizado con éxito.',
        showConfirmButton: true
      });
      this.router.navigate(['/usuarios']); // Retrocede una página en el historial
    }, error => {
      console.error('Error al actualizar Usuario: ', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar el usuario.',
        showConfirmButton: true
      });
    });
  }

  crearUsuario() {
    this.usuarioService.crearUsuario(this.usuario).subscribe(response => {
      console.log('Usuario Creado', response);
      Swal.fire({
        icon: 'success',
        title: 'Usuario Creado',
        text: 'El usuario ha sido creado con éxito.',
        showConfirmButton: true
      });
      // window.history.back();  // Retrocede una página en el historial
      this.router.navigate(['/usuarios']);
    }, error => {
      console.log('Error Al Crear El Usuario', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el usuario.',
        showConfirmButton: true
      });
    })
  }

  borrarUsuario(id: string) {
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
      this.usuarioService.borrarUsuario(id).subscribe(
        data => {
          Swal.fire(
            'Borrado!',
            'El usuario ha sido borrado.',
            'success'
          );
          window.history.back();  // Retrocede una página en el historial
        },
        error => {
          console.error('Error al borrar el usuario', error);
          Swal.fire(
            'Error!',
            'Hubo un error al borrar el usuario.',
            'error'
            );
          }
        );
      }
    });
  }

}
