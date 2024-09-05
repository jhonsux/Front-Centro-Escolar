import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  id = ""
  usuario: any = {}

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.usuarioService.obtenerUsuario(this.id).subscribe(data => {
        this.usuario = data[0];
        console.log(this.usuario)
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
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(response => {
      console.log('Usuario actualizado: ', response);
      Swal.fire({
        icon: 'success',
        title: 'Usuario Actualizado',
        text: 'El usuario ha sido actualizado con éxito.',
        showConfirmButton: true
      });
      window.history.back();  // Retrocede una página en el historial
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
