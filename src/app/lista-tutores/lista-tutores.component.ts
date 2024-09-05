import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TutoresModel } from '../shared/alumno.model';
import { TutorService } from '../shared/tutor.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-lista-tutores',
  templateUrl: './lista-tutores.component.html',
  styleUrls: ['./lista-tutores.component.css']
})
export class ListaTutoresComponent implements OnInit {

  tutores: Observable<TutoresModel[]> | undefined

  usuario: any = {}
  user_id = ''
  userRole = '';

  constructor(private tutorService: TutorService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tutores = this.tutorService.obtenerTutores();

    this.user_id = this.authService.getUserId();
    this.usuarioService.obtenerUsuario(this.user_id).subscribe(data => {
      this.usuario = data[0]
    })

     // Obtener el rol del usuario y guardarlo en la propiedad
     this.userRole = this.authService.getUserRole();
     console.log(this.userRole)

  }

  borrarTutor(id: string) {
    if (confirm('Seguro que deseas BORAR este Tutor?'))
      this.tutorService.borrarTutor(id).subscribe(data => {
        console.log('Tutor borrado')
        alert('Tutor Borrado')
        this.tutores = this.tutorService.obtenerTutores()
      },error => {
      console.error('Error al borrar el Tutor', error);
      alert('Hubo un error al borrar el Tutor');
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
