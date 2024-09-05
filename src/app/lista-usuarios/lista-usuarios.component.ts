import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosModel } from '../shared/alumno.model';
import { UsuarioService } from '../shared/usuario.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Observable<UsuariosModel[]> | undefined

  usuario: any = {}
  user_id = ''
  userRole = '';

  constructor(private usuariosService: UsuarioService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user_id = this.authService.getUserId();
    this.usuarioService.obtenerUsuario(this.user_id).subscribe(data => {
      this.usuario = data[0]
    })

     // Obtener el rol del usuario y guardarlo en la propiedad
     this.userRole = this.authService.getUserRole();
     console.log(this.userRole)

    this.usuarios = this.usuariosService.obtenerUsuarios();

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

  borrarUsuario(id: string) {
    if (confirm('Seguro que deseas BORAR este Usuario?'))
      this.usuariosService.borrarUsuario(id).subscribe(data => {
        console.log('Usuario borrado')
        alert('Usuario Borrado')
        this.usuarios = this.usuariosService.obtenerUsuarios()
      },error => {
      console.error('Error al borrar el Usuario', error);
      alert('Hubo un error al borrar el Ususario');
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
