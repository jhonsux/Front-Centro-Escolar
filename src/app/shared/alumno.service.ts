import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnoModel, CicloModelC, CiclosModel, PeriodoModelC, ReportesModel, ReportesModelC } from './alumno.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  [x: string]: any;

  BASE_URL = 'https://backend-centro-escolar-gnm-production.up.railway.app'
  //BASE_URL = 'http://192.168.1.66:3000'

  constructor(private http: HttpClient, private authService: AuthService) { }


  obtenerAlumnos(): Observable<any> {
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<AlumnoModel[]>(this.BASE_URL + '/alumnos', { headers });
  }

  alumnosGraduados(): Observable<any> {
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<AlumnoModel[]>(this.BASE_URL + '/alumnos/graduados', { headers });
  }

  obtenerReporteAlumno(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/alumnos/reporte/${id}`)
  }

  obtenerReportesDeAlumno(id: string) {
    return this.http.get<ReportesModel[]>(`${this.BASE_URL}/alumnos/${id}/reportes`);
  }

  buscarAlumno(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/alumnos/buscar?query=${query}`);
  }

  // obtenerAlumnoPaterno(id: string) {
  //   return this.http.get<AlumnoModel[]>(`${this.BASE_URL}/alumnos/parent/${id}`);
  // }

  obtenerAlumno(id: string) {
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<AlumnoModel[]>(`${this.BASE_URL}/alumnos/${id}`, { headers});
  }

  crearAlumno(alumno: AlumnoModel) {
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<string>(`${this.BASE_URL}/alumnos/crear`, alumno, { headers});
  }

  actualizarAlumno(alumno: AlumnoModel){
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<string>(`${this.BASE_URL}/alumnos/actualizar/${alumno.student_id}`, alumno, { headers});
  }

  borrarAlumno(id: string) {
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<string>(`${this.BASE_URL}/alumnos/${id}`, { headers});
  }

  obtenerCiclos(): Observable<any> {
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<CiclosModel[]>(this.BASE_URL + '/ciclos', { headers });
  }

  crearCiclo(ciclo: CicloModelC) {
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<string>(`${this.BASE_URL}/ciclos/crear-ciclo`, ciclo, { headers})
  }

  obtenerCiclo(id: string) {
    return this.http.get<CiclosModel[]>(`${this.BASE_URL}/ciclos/${id}`);
  }

  crearPeriodo(periodo: PeriodoModelC) {
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<string>(`${this.BASE_URL}/ciclos/crear-periodo`, periodo, { headers})
  }

}
