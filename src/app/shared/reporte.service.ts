import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportesModel, ReportesModelC } from './alumno.model';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  [x: string]: any;

  BASE_URL = 'http://localhost:3000'
  //BASE_URL = 'http://192.168.1.66:3000'

  constructor(private http: HttpClient, private authService: AuthService) { }

  crearReporte(reporte: ReportesModelC){
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<string>(`${this.BASE_URL}/reportes/crear`, reporte, { headers});
  }

  obtenerReportes(){
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ReportesModel[]>(this.BASE_URL + '/reportes', { headers});
  }

  obtenerReporte(id: string) {
    return this.http.get<ReportesModel[]>(`${this.BASE_URL}/reportes/${id}`)
  }

  actualizarReporte(reporte: ReportesModel){
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<string>(`${this.BASE_URL}/reportes/actualizar/${reporte.report_id}`, reporte, { headers});
  }

  borrarReporte(id: string){
    return this.http.delete<string>(`${this.BASE_URL}/reportes/${id}`);
  }


}
