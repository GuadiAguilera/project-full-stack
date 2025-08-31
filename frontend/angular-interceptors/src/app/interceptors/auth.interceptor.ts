import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

// todas las peticiones de la aplicacion van a pasar por este interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID); // El patfromId nos va a decir en forma de string si esta en el server o en el browser 
  const authService = inject(AuthService);
  if(isPlatformServer(platformId)) {return next(req);} // si esta en el server no hacemos nada y retornamos la peticion original

  const token = localStorage.getItem('token'); 
  let headers = req.headers.set('Content-Type', 'application/json');
  if(token){
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  const authReq = req.clone({ headers }); // se clona la peticion original con la cabecera cambiada

  // usuario pide algo con un token
  // server responde un 403 por token expirado
  // interceptamos el error y pedimos refrescar el token
  // si va todo bien, utilizamos y guardamos el nuevo token con la peticion que había fallado anteriormente
  // si es otro error, lo devolvemos
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        return authService.refreshToken().pipe(
          switchMap(newToken => {
            localStorage.setItem("token", newToken);

            const updateHeaders = req.headers.set('Authorization', `Bearer ${newToken}`);
            const newRequest = req.clone({ headers: updateHeaders });

            return next(newRequest);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
