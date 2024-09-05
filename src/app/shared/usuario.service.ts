import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuariosModel, UsuariosModelC } from './alumno.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  [x: string]: any;

  BASE_URL = 'http://localhost:3000'
  //BASE_URL = 'http://192.168.1.66:3000'

  constructor(private http: HttpClient, private authService: AuthService) { }

  obtenerUsuarios(){
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UsuariosModel[]>(this.BASE_URL + '/usuarios', { headers})
  }

  obtenerUsuario(id: string){
    return this.http.get<UsuariosModel[]>(`${this.BASE_URL}/usuarios/${id}`);
  }

  crearUsuario(usuario: UsuariosModelC){
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<string>(`${this.BASE_URL}/auth/register`, usuario, { headers});
  }

  actualizarUsuario(usuario: UsuariosModel){
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<string>(`${this.BASE_URL}/usuarios/actualizar/${usuario.user_id}`, usuario, { headers});
  }

  borrarUsuario(id: string){
    const token = this.authService.getToken(); // Obtén el token almacenado
    //console.log('Token:', token); // Agrega este log para verificar el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<string>(`${this.BASE_URL}/usuarios/${id}`, { headers});
  }

}
