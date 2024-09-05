import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlumnoService } from '../shared/alumno.service';
import { ActivatedRoute } from '@angular/router';
import { CicloModelC, CiclosModel } from '../shared/alumno.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-alumno',
  templateUrl: './buscar-alumno.component.html',
  styleUrls: ['./buscar-alumno.component.css']
})
export class BuscarAlumnoComponent implements OnInit {
  ciclos: Observable<CiclosModel[]> | undefined;
  Ciclo = {
    fecha_inicio: '',
    fecha_fin: ''
  };

  constructor(
    private ciclosService: AlumnoService
  ) { }

  ngOnInit(): void {
    this.ciclos = this.ciclosService.obtenerCiclos();

  }

  guardarCiclo(ciclo: any) {
    // Aquí iría la lógica para guardar el ciclo existente
    console.log('Guardando ciclo:', ciclo);
  }

  crearCiclo() {
    this.ciclosService.crearCiclo(this.Ciclo).subscribe(response => {
      console.log('Alumno Creado', response);
      Swal.fire({
        icon: 'success',
        title: 'Ciclo Escolar Creado',
        text: 'El ciclo escolar ha sido creado con éxito.',
        showConfirmButton: true
      });
      window.history.back();  // Retrocede una página en el historial

    }, error => {
      console.log('Error al crear el Ciclo escolar', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el ciclo escolar.',
        showConfirmButton: true
      });
    })
    // Lógica para agregar el nuevo ciclo escolar
    console.log(this.Ciclo)
    // Limpiar el formulario después de agregar
    this.Ciclo = { fecha_inicio: '', fecha_fin: '' };
  }

}
