import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JustificantesModel, JustificantesModelC } from './alumno.model';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class JustificanteService {
  [x: string]: any;

  BASE_URL = 'https://backend-centro-escolar-gnm-production.up.railway.app'
  // BASE_URL = 'http://localhost:3000'
  //BASE_URL = 'http://192.168.1.66:3000'

  constructor(private http: HttpClient, private authService: AuthService) { }


  crearJustificante(justificante: JustificantesModelC) {
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<string>(`${this.BASE_URL}/justificantes/crear`, justificante, { headers})
  }

  obtenerJustificante(id: string) {
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<JustificanteService[]>(`${this.BASE_URL}/justificantes/${id}`, { headers})
  }

  obtenerJustificantes() {
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<JustificantesModel[]>(`${this.BASE_URL}/justificantes`, { headers});
  }

  borrarJustificante(id: string) {
    return this.http.delete<string>(`${this.BASE_URL}/justificantes/${id}`)
  }

}
