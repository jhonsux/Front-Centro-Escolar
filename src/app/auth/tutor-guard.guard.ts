import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TutorGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userRole = this.authService.getUserRole();

    // Verifica si el rol es adecuado para acceder a estas rutas
    if (userRole === 'admin') {
      return true;
    }

    // Si el usuario no tiene el rol adecuado, redirige a una página de acceso login
    this.router.navigate(['/menu']);
    return false;
  }

}
