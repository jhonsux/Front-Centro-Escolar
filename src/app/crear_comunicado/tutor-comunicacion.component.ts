import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutorService } from '../shared/tutor.service';
import { ComunicadoService } from '../shared/comunicado.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tutor-comunicacion',
  templateUrl: './tutor-comunicacion.component.html',
  styleUrls: ['./tutor-comunicacion.component.css']
})
export class TutorComunicacionComponent implements OnInit {

  id = ""
  tutor: any = {}
  comunicado = {
    parent_id: '',
    date: '',
    method: '',
    description: ''
  }

  constructor(
    private tutorService: TutorService,
    private comunicadoService: ComunicadoService,
    private route: ActivatedRoute,
  ) { const today = new Date();
    this.comunicado.date = today.toISOString().split('T')[0]}


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.tutorService.obtenerTutor(this.id).subscribe(data => {
      this.tutor = data[0]
      this.comunicado.parent_id = this.id
    })
  };

  crearComunicado() {
    this.comunicadoService.crearComunicado(this.comunicado).subscribe(response => {
      console.log('Comunicado Creado', response);
      Swal.fire({
        icon: 'success',
        title: 'Comunicado Creado',
        text: 'El comunicado ha sido creado con éxito.',
        showConfirmButton: true
      });
      window.history.back();  // Retrocede una página en el historial
    }, error => {
      console.log('Error al crear el comunicad', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el cominucado.',
        showConfirmButton: true
      });
      
    })
  }

}
