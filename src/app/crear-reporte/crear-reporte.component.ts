import { Component, Input, OnInit } from '@angular/core';
import { AlumnoService } from '../shared/alumno.service';
import { ReporteService } from '../shared/reporte.service';
import { IncidenciaService } from '../shared/incidencia.service';
import { AuthService } from '../shared/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-reporte',
  templateUrl: './crear-reporte.component.html',
  styleUrls: ['./crear-reporte.component.css']
})
export class CrearReporteComponent implements OnInit {

  criterio: string = ''
  alumnos: any[] = []
  alumnoSeleccionado: any = null;  // Cambiamos a un objeto

  criterioBusquedaIncidencia: string = '';
  incidencias: any = {};
  incidenciaSeleccionada: any = null;  // Cambiamos a un objeto

  reporte: any = {
    student_id: '',
    type_id: '',
    user_id: '',
    description: '',
    justificado: '',
    date: ''
  }

  constructor(
    private alumnoService: AlumnoService,
    private incidenciaService: IncidenciaService,
    private reporteService: ReporteService,
    private authService: AuthService,
    private router: Router
  ) {
    const today = new Date();
    this.reporte.date = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.incidencias = this.incidenciaService.obtenerIncidencias()
    console.log(this.incidencias)
    this.reporte.user_id = this.authService.getUserId();
    if (this.authService.isTokenExpired()) {
      Swal.fire({
        icon: 'warning',
        title: 'Sesión expirada',
        text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.authService.logout();
        window.location.href = '/login';
      });
    }
  }

  buscarAlumno() {
    this.alumnoService.buscarAlumno(this.criterio).subscribe(
      data => {
        this.alumnos = data.map((alumno: any) => ({ ...alumno, seleccionado: false }));

        if (this.alumnos.length === 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Alumno no encontrado',
            text: 'No se encontró ningún alumno con ese nombre.',
            confirmButtonText: 'OK'
          });
        }
      },
      error => {
        if (error.status === 404) {
          Swal.fire({
            icon: 'warning',
            title: 'Alumno no encontrado',
            text: 'No se encontró ningún alumno con ese nombre.',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al buscar al alumno. Inténtalo de nuevo más tarde.',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }

  seleccionarAlumno(alumno: any) {
    this.alumnoSeleccionado = alumno.seleccionado ? alumno : null;
    this.reporte.student_id = this.alumnoSeleccionado ? alumno.student_id : '';
  }

  buscarIncidencia() {
    this.incidenciaService.buscarIncidencia(this.criterioBusquedaIncidencia).subscribe(
      data => {
        this.incidencias = data.map((incidencia: any) => ({ ...incidencia, seleccionado: false }));
      },
      error => {
        console.error('Error al buscar incidencia:', error);
      }
    );
  }

  seleccionarIncidencia(incidencia: any) {
    this.incidenciaSeleccionada = incidencia.seleccionado ? incidencia : null;
    this.reporte.type_id = this.incidenciaSeleccionada ? incidencia.type_id : '';
  }

  crearReporte() {
    this.reporteService.crearReporte(this.reporte).subscribe(response => {
      Swal.fire({
        icon: 'success',
        title: 'Reporte Creado',
        text: 'El reporte ha sido creado con éxito.',
        showConfirmButton: true
      });
      this.router.navigate(['/reportes']);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el reporte.',
        showConfirmButton: true
      });
    });
  }

}
