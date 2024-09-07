import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TutoresModel } from './alumno.model';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  [x: string]: any;

  BASE_URL = 'https://backend-centro-escolar-gnm-production.up.railway.app'
  // BASE_URL = 'http://localhost:3000'
  //BASE_URL = 'http://192.168.1.66:3000'

  constructor(private http: HttpClient, private authService: AuthService) { }

  obtenerTutores(){
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<TutoresModel[]>(this.BASE_URL + '/tutores', {headers});
  }

  obtenerTutor(id: string){
    return this.http.get<TutoresModel[]>(`${this.BASE_URL}/tutores/${id}`);
  }

  crearTutor(tutor: TutoresModel){
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<string>(`${this.BASE_URL}/tutores/crear`, tutor, { headers});
  }

  actualizarTutor(tutor: TutoresModel){
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<string>(`${this.BASE_URL}/tutores/actualizar/${tutor.parent_id}`, tutor, { headers});
  }

  borrarTutor(id: string){
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<string>(`${this.BASE_URL}/tutores/${id}`, { headers});
  }
}


