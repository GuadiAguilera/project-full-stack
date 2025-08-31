import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private baseUrl = process.env.BASE_URL;
  private baseUrl = 'http://localhost:4200';

  http = inject(HttpClient);
  router = inject(Router);

  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    // fiderencia entre token y refreshToken
    // token => es algo que se va a estar utilizando para pegarle a un endpoint para identificar al ausuario que esta realizando la peticion (autenticacion) 
    // autenticacion=quien es. autorizacion=ya se quien es, que es lo que puede hacer(roles)
    // refreshToken => se expira el token (hay muchas politicas de expitacion de token (debe expirar por lo menos durante un dia, maximo)) Lo mas seguro es que ante una peticio el token expire
    // El token se asigna cuando hacemos login porque el token representa el usuario dentro de una sesion
    // refresh token va a pasar cuando expire el tiempo que se establecio. Cuando se hace refreshToken se esta haciendo otro token para identificar al usuario cuando se le vencio el tiempo de utilizacion del token (reinicia la sesion sin tener que sacar al usuario de la sesion)

    if (!refreshToken) {
      this.logOut();
      return throwError(() => new Error('No refresh token found'));
    }
    return this.http
      .post<{ refreshToken: string }>(`${this.baseUrl}/token`, { refreshToken })
      .pipe(
        map(response => response.refreshToken),
        tap((newAccessToken) => {
          localStorage.setItem('token', newAccessToken);
        }),
        catchError(error => {
          this.logOut();
          return throwError(() => error);
        })
      );

  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  constructor() { }
}
