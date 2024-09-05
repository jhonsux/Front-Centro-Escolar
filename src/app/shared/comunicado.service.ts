import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicadosModel, ComunicadosModelC } from './alumno.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class ComunicadoService {
  [x: string]: any;

  BASE_URL = 'http://localhost:3000'
  //BASE_URL = 'http://192.168.1.66:3000'

  constructor(private http: HttpClient, private authService: AuthService) { }

  crearComunicado(comunicado: ComunicadosModelC) {
    return this.http.post<string>(`${this.BASE_URL}/comunicados/crear`, comunicado)
  }

  obtenerComunicado(id: string) {
    return this.http.get<ComunicadosModel[]>(`${this.BASE_URL}/comunicados/${id}`)
  }


}
