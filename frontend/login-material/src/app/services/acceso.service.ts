import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable, of, delay } from 'rxjs';
import { ResponseAcceso } from '../../interfaces/ResponseAcceso';
import { Usuario } from '../../interfaces/Usuario';
import { Login } from '../../interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.API_URL;

  constructor() { }

  // REGISTRO HARDCODEADO - TEMPORAL PARA DESARROLLO
  registrarse(objeto: Usuario): Observable<ResponseAcceso>{
    // Simular registro exitoso sin hacer request HTTP
    return of({
      isSuccess: true,
      token: "fake-registro-token-123456789",
      message: "Usuario registrado exitosamente"
    }).pipe(delay(1000));
  }

  // LOGIN HARDCODEADO - TEMPORAL PARA DESARROLLO
  login(objeto: Login): Observable<ResponseAcceso>{
    // Simular delay de red
    return of({
      isSuccess: this.validarCredenciales(objeto.correo, objeto.clave),
      token: this.validarCredenciales(objeto.correo, objeto.clave) ? "fake-jwt-token-123456789" : "",
      message: this.validarCredenciales(objeto.correo, objeto.clave) ? "Login exitoso" : "Credenciales incorrectas"
    }).pipe(delay(1000)); // Simula 1 segundo de delay
  }

  // Método privado para validar credenciales hardcodeadas
  private validarCredenciales(correo: string, clave: string): boolean {
    // Usuarios hardcodeados para pruebas
    const usuariosValidos = [
      { correo: "admin@test.com", clave: "123456" },
      { correo: "user@test.com", clave: "password" },
      { correo: "demo@demo.com", clave: "demo123" }
    ];

    return usuariosValidos.some(user => 
      user.correo === correo && user.clave === clave
    );
  }

  // login(objeto: Login): Observable<ResponseAcceso>{
  //   return this.http.post<ResponseAcceso>(`${this.baseUrl}acceso/login`, objeto)
  // }
    //    registrarse(objeto: Usuario): Observable<ResponseAcceso> {
    //       return this.http.post<ResponseAcceso>(`${this.baseUrl}Acceso/Registrarse`, objeto)
    //  }

      validarToken(token: string): Observable<ResponseAcceso>{
        return this.http.get<ResponseAcceso>(`${this.baseUrl}acceso/validar-token?token=${token}`);
      }


}
