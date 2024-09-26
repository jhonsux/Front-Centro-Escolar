import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadService } from '../shared/upload.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editar-reporte',
  templateUrl: './editar-reporte.component.html',
  styleUrls: ['./editar-reporte.component.css']
})
export class EditarReporteComponent implements OnInit {
  selectedFile: File | null = null;


  constructor(
    private uploadService: UploadService,
    private router: Router

  ) { }

   onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.uploadService.uploadCsv(this.selectedFile).subscribe(
        (response) => {
          console.log('Archivo subido exitosamente', response);
          Swal.fire({
            icon: 'success',
            title: 'Archivo Creado',
            text: 'El Archivo se ha subido con éxito.',
            showConfirmButton: true
          });
          this.router.navigate(['/menu']);
        },
        (error) => {
          console.error('Error al subir el archivo', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al subir el archivo.',
            showConfirmButton: true
          });
        }
      );
    }
  }

  uploadTutorescsv(): void {
    if (this.selectedFile) {
      this.uploadService.uploadTutoresCsv(this.selectedFile).subscribe(
        (response) => {
          console.log('Archivo subido exitosamente', response);
          Swal.fire({
            icon: 'success',
            title: 'Archivo Creado',
            text: 'El Archivo se ha subido con éxito.',
            showConfirmButton: true
          });
          this.router.navigate(['/menu']);
        },
        (error) => {
          console.error('Error al subir el archivo', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al subir el archivo.',
            showConfirmButton: true
          });
        }
      );
    }
  }

  downloadBackup() {
    this.uploadService.downloadBackup().subscribe((response: any) => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'backup.sql';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  // Método para enviar el archivo al backend
  onUpload(): void {
    if (this.selectedFile) {
      this.uploadService.uploadBackup(this.selectedFile)
        .subscribe({
          next: (response) => {
            console.log('Archivo subido con éxito:', response);
          },
          error: (error) => {
            console.error('Error al subir el archivo:', error);
          }
        });
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
  }

}
