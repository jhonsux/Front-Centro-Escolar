import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://backend-centro-escolar-gnm-production.up.railway.app';
  //BASE_URL = 'http://192.168.1.66:3000/auth'

  private tokenExpirationSubject = new BehaviorSubject<boolean>(false);
  private tokenKey = 'token';  // Clave para almacenar el token en el localStorage

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUserId(): string {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.id
    }
    return 'no';
  }

// Método para obtener el rol del usuario desde el token
  getUserRole(): string {
    const token = this.getToken();
    if (!token) {
      return 'null';
    }
    const decode: any = jwtDecode(token);
    //console.log(decode); // Verifica si el campo user_types está presente
    return decode.tipo;
  }


  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decoded: any = jwtDecode(token);
    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate < new Date();
  }

  setTokenExpirationTimer(token: string) {
    const decoded: any = jwtDecode(token);
    const expirationDate = new Date(decoded.exp * 2000);
    const timeout = expirationDate.getTime() - new Date().getTime();

    setTimeout(() => {
      this.tokenExpirationSubject.next(true);
    }, timeout);
  }

  getTokenExpirationSubject(): BehaviorSubject<boolean> {
    return this.tokenExpirationSubject;
  }


}
