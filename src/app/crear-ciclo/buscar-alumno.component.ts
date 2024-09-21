import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlumnoService } from '../shared/alumno.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  periodo: any  = {};

  constructor(
    private ciclosService: AlumnoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ciclos = this.ciclosService.obtenerCiclos();
    this.ciclos.subscribe(data => {
      if (data.length > 0) {
        // Guarda el último ciclo_id en cicle_id
        this.periodo.cicle_id = data[data.length - 1].cicle_id;
      }
    });
  }

 crearPeriodo() {
  this.ciclosService.crearPeriodo(this.periodo).subscribe(response => {
    console.log('Periodo escolar Creado', response);
    Swal.fire({
      icon: 'success',
      title: 'Periodo Escolar Creado',
      text: 'El periodo escolar ha sido creado con éxito.',
      showConfirmButton: true
    });
    this.router.navigate(['/alumnos']);  //
  }, error => {
    console.log('Error al crear el periodo escolar', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al crear el periodo escolar.',
      showConfirmButton: true
    });
  })
  // Limpiar el formulario después de agregar
  //this.Ciclo = { fecha_inicio: '', fecha_fin: '' };
 }

  crearCiclo() {
    this.ciclosService.crearCiclo(this.Ciclo).subscribe(response => {
      console.log('Ciclo escolar Creado', response);
      Swal.fire({
        icon: 'success',
        title: 'Ciclo Escolar Creado',
        text: 'El ciclo escolar ha sido creado con éxito.',
        showConfirmButton: true
      });
      this.router.navigate(['/alumnos']);   // Retrocede una página en el historial

    }, error => {
      console.log('Error al crear el Ciclo escolar', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el ciclo escolar.',
        showConfirmButton: true
      });
    })
    // Limpiar el formulario después de agregar
    //this.Ciclo = { fecha_inicio: '', fecha_fin: '' };
  }

}
