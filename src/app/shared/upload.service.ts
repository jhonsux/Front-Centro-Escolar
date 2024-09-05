import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadCsv(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.BASE_URL}/ciclos/upload`, formData, { headers });
  }

  downloadBackup() {
    return this.http.get(`${this.BASE_URL}/backup`, { responseType: 'blob' as 'json' });
  }
}
