import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportesModel } from '../shared/alumno.model';
import { Router } from '@angular/router';
import { ReporteService } from '../shared/reporte.service';
import { AuthService } from '../shared/auth.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-lista-reportes',
  templateUrl: './lista-reportes.component.html',
  styleUrls: ['./lista-reportes.component.css']
})
export class ListaReportesComponent implements OnInit {

  reportes: any = {}
  usuario: any = {}
  user_id = ''
  userRole = '';

  constructor(
    private reportesService: ReporteService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reportes = this.reportesService.obtenerReportes();

    this.user_id = this.authService.getUserId();
    this.usuarioService.obtenerUsuario(this.user_id).subscribe(data => {
      this.usuario = data[0]
    })

     // Obtener el rol del usuario y guardarlo en la propiedad
     this.userRole = this.authService.getUserRole();
     console.log(this.userRole)

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

  // borrarReporte(id: string) {
  //   if (confirm('Seguro que deseas BORAR este Reporte?'))
  //     this.reportesService.borrarReporte(id).subscribe(data => {
  //       console.log('Reporte borrado')
  //       alert('Reporte Borrado')
  //       this.reportes = this.reportesService.obtenerReportes()
  //     },error => {
  //     console.error('Error al borrar el Reporte', error);
  //     alert('Hubo un error al borrar el Reporte');
  //   }
  //  );
  // }

  borrarReporte(id: string) {
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
        this.reportesService.borrarReporte(id).subscribe(
          data => {
            Swal.fire(
              'Borrado!',
              'El reporte ha sido borrado.',
              'success'
            );
            // window.location.href = '/alumnos';
            window.location.reload()
          },
          error => {
            console.error('Error al borrar el Reporte', error);
            Swal.fire(
              'Error!',
              'Hubo un error al borrar el Reporte.',
              'error'
            );
          }
        );
      }
    });
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
