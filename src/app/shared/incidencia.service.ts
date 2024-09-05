import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IncidenciasModel } from './alumno.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  [x: string]: any;

  BASE_URL = 'http://localhost:3000'
  //BASE_URL = 'http://192.168.1.66:3000'

  constructor(private http: HttpClient, private authService: AuthService) { }

  buscarIncidencia(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/incidencias/buscar?query=${query}`);
  }

  crearIncidencia(incidencia: IncidenciasModel) {
    return this.http.post<string>(`${this.BASE_URL}/incidencias/crear`, incidencia)
  }


}
