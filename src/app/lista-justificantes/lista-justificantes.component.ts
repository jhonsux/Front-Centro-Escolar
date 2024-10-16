import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { JustificantesModel } from '../shared/alumno.model';
import { JustificanteService } from '../shared/justificante.service';
import { ReporteService } from '../shared/reporte.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { jsPDF } from 'jspdf'; // Importa jsPDF para generar el PDF
import Swal from 'sweetalert2';
import { AlumnoService } from '../shared/alumno.service';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-lista-justificantes',
  templateUrl: './lista-justificantes.component.html',
  styleUrls: ['./lista-justificantes.component.css']
})
export class ListaJustificantesComponent implements OnInit {
  justificantes: Observable<JustificantesModel[]> | undefined;
  reporte: any = {}
   id = ""
   alumno: any = {}

   usuario: any = {}
   user_id = ''
   userRole = '';

  constructor(
    private justificanteService: JustificanteService,
    private reporteService: ReporteService,
    private alumnosService: AlumnoService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.justificantes = this.justificanteService.obtenerJustificantes();
    console.log(this.justificantes);

    this.justificanteService.obtenerJustificantes().subscribe(data => {
      console.log(data);
    })

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


  downloadJustificante(justificante: JustificantesModel) {
    forkJoin({
      alumno: this.alumnosService.obtenerAlumno(`${justificante.student_id}`),
      reporte: this.reporteService.obtenerReporte(`${justificante.report_id}`)
    }).subscribe(({ alumno, reporte }) => {
      this.alumno = alumno[0];
      this.reporte = reporte[0];

      console.log(alumno)

      const doc = new jsPDF();

      // Texto predeterminado
      doc.setFontSize(18);
      doc.text('Centro Escolar General Rafael Cravioto Pacheco', 40, 10);
      doc.text('Bachillerato Matutino', 80, 20);
      doc.text('Incidencia de Reporte ', 20, 30);


      doc.setFontSize(12);
      doc.text('Cento de Trabajo: 21EBH0281Y ', 90, 30);
      doc.text(`Numero De Reporte: # ${justificante.report_id}`, 20, 40);
      doc.text(`Tipo De Incidencia: ${this.reporte.incidencia}`, 20, 50);
      doc.text(`Alumno: ${this.alumno.name} ${this.alumno.firstname} ${this.alumno.lastname}`, 20, 60);
      doc.text(`Fecha de Emisión: ${new Date(justificante.issue_date).toLocaleDateString()}`, 20, 70);
      doc.text(`Detalles del incidente: ${this.reporte.description}`, 20, 80);
      doc.text('Acuerdos y Compromisos:', 20, 90);

      // Ajuste del texto de la descripción para que haga salto de línea si es necesario
      const descripcionMaxWidth = 170; // Ancho máximo permitido para la descripción
      doc.text(`${justificante.description}`, 20, 100, { maxWidth: descripcionMaxWidth });

      // Espacio para la firma
      doc.setLineWidth(0.5);
      doc.line(20, 130, 80, 130);  // Línea para la firma
      doc.text('Firma Autoriza', 30, 135);

      // Espacio para el sello
      doc.rect(130, 120, 50, 35);  // Rectángulo para el sello
      doc.text('Sello', 150, 135);

      // Añadir imagen en la esquina superior derecha
    const imgData = 'assets/imaje.png'; // Reemplaza con la base64 de la imagen o la URL de la imagen
    const imgWidth = 40; // Ajusta el ancho de la imagen
    const imgHeight = 50; // Ajusta la altura de la imagen
    const x = doc.internal.pageSize.getWidth() - imgWidth - 10; // Ajuste para la posición X
    const y = 20; // Ajuste para la posición Y
    doc.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

      // Descarga el PDF con el nombre del alumno
      const fileName = `justificante_${this.alumno.name}_${justificante.report_id}.pdf`;
      doc.save(fileName);
    });
  }

  borrarJustificante(id: string) {
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
        console.log('ID del justificante a borrar:', id);
        this.justificanteService.borrarJustificante(id).subscribe(
          data => {
            Swal.fire(
              'Borrado!',
              'El Justificante ha sido borrado.',
              'success'
            );
            this.actualizarReporte()
            // window.location.href = '/alumnos';
            window.location.reload()
          },
          error => {
            console.error('Error al borrar el alumno', error);
            Swal.fire(
              'Error!',
              'Hubo un error al borrar el comunicado.',
              'error'
            );
          }
        );
      }
    });
  }

  actualizarReporte() {
    this.reporte.justificado = 'NO'
    this.reporteService.actualizarReporte(this.reporte).subscribe(data => {
      console.log('Reporte Actualizado', data);
      // Aquí se muestra el mensaje de éxito solo si la actualización es exitosa
    }, error => {
      console.log('Error al actualizar el reporte', error, this.reporte);

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
