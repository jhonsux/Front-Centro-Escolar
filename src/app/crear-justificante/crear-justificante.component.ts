import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteService } from '../shared/reporte.service';
import { JustificanteService } from '../shared/justificante.service';
import { AlumnoService } from '../shared/alumno.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-crear-justificante',
  templateUrl: './crear-justificante.component.html',
  styleUrls: ['./crear-justificante.component.css']
})
export class CrearJustificanteComponent implements OnInit {

  id = ""
  alumno: any = {}
  student_id = ''
  reporte: any = {}
  justificante = {
    report_id: '',
    student_id: '',
    issue_date: '',
    description: ''
  }

  constructor(
    private route: ActivatedRoute,
    private reporteService: ReporteService,
    private justificanteService: JustificanteService,
    private alumnoService: AlumnoService,
    private authService: AuthService
  ) { const today = new Date();
    this.justificante.issue_date = today.toISOString().split('T')[0] }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.reporteService.obtenerReporte(this.id).subscribe(data => {
      this.reporte = data[0]
      console.log(this.reporte)
      this.justificante.report_id = this.id
      this.justificante.student_id = this.reporte.student_id

    this.alumnoService.obtenerAlumno(this.justificante.student_id).subscribe(data => {
      this.alumno = data[0]
      console.log(this.alumno)
    })
    })

    console.log(this.justificante)



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

  crearJustificante() {
    this.justificanteService.crearJustificante(this.justificante).subscribe(response => {
      console.log('Justificnate Creado', response);
      //alert('Justificante Creado Con Exito');
      this.actualizarReporte();  // Llama a la función para actualizar el reporte
      this.generarPDF();
      Swal.fire({
        icon: 'success',
        title: 'Justificante Creado',
        text: 'El justificante ha sido creado con éxito.',
        showConfirmButton: true
      });
      window.location.href = '/justificantes';// Retrocede una página en el historial
    }, error => {
      console.log('Error al crear el Justificante', error);
      //alert('Hubo un error al crear el Justificante');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el Justificante.',
        showConfirmButton: true
      });
    })
  }

  actualizarReporte() {
    this.reporte.justificado = 'Si'
    this.reporteService.actualizarReporte(this.reporte).subscribe(data => {
      console.log('Reporte Actualizado', data);
      // Aquí se muestra el mensaje de éxito solo si la actualización es exitosa
    }, error => {
      console.log('Error al actualizar el reporte', error, this.reporte);

    });
  }

  generarPDF() {
    const doc = new jsPDF();

    // Texto predeterminado
    doc.setFontSize(18);
    doc.text('Centro Escolar General Rafael Cravioto Pacheco', 40, 10);
    doc.text('Bachillerato Matutino', 80, 20);
    doc.text('Incidencia de Reporte', 20, 30);

    doc.setFontSize(12);
    doc.text('Cento de Trabajo: 21EBH0281Y ', 90, 30);
    doc.text(`Numero De Reporte: # ${this.justificante.report_id}`, 20, 40);
    doc.text(`Tipo De Incidencia: ${this.reporte.incidencia}`, 20, 50);
    doc.text(`Alumno: ${this.alumno.name} ${this.alumno.firstname} ${this.alumno.lastname}`, 20, 60);
    doc.text(`Fecha de Emisión: ${this.justificante.issue_date}`, 20, 70);

    // Ajuste del texto de la descripción
    const descripcionMaxWidth = 170; // Ancho máximo permitido para la descripción
    let yPosition = 80; // Posición inicial de "Detalles del incidente"

    // Para ajustar el texto y permitir que se haga salto de línea automáticamente
    const descriptionText = `Detalles del incidente: ${this.reporte.description}`;
    const descriptionLines = doc.splitTextToSize(descriptionText, descripcionMaxWidth);
    doc.text(descriptionLines, 20, yPosition);

    // Ajustar la posición vertical (y) para la siguiente sección
    yPosition += descriptionLines.length * 10; // Asume 10 de altura por línea (ajustar según tamaño de fuente)

    // Acuerdos y compromisos
    doc.text('Acuerdos y Compromisos:', 20, yPosition);
    yPosition += 10; // Espacio después del título

    // Texto de los acuerdos (similar al texto de la descripción)
    const acuerdosLines = doc.splitTextToSize(this.justificante.description, descripcionMaxWidth);
    doc.text(acuerdosLines, 20, yPosition);

    yPosition += acuerdosLines.length * 10; // Ajustar la posición vertical

    // Espacio para la firma
    yPosition += 20; // Añadir un poco de espacio antes de la firma
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 80, yPosition); // Línea para la firma
    doc.text('Firma Autoriza', 30, yPosition + 5);

    // Espacio para el sello
    doc.rect(130, yPosition - 20, 50, 35);  // Rectángulo para el sello
    doc.text('Sello', 150, yPosition);

    // Añadir imagen en la esquina superior derecha
    const imgData = 'assets/imaje.png'; // Reemplaza con la base64 de la imagen o la URL de la imagen
    const imgWidth = 40; // Ajusta el ancho de la imagen
    const imgHeight = 45; // Ajusta la altura de la imagen
    const x = doc.internal.pageSize.getWidth() - imgWidth - 10; // Ajuste para la posición X
    const y = 20; // Ajuste para la posición Y
    doc.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

    // Descarga el PDF
    const fileName = `justificante_${this.justificante.report_id}_${this.justificante.student_id}.pdf`;
    doc.save(fileName);
  }

}
