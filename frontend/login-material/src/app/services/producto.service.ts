import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable, of, delay } from 'rxjs';
import { ResponseAcceso } from '../../interfaces/ResponseAcceso';
import { Producto } from '../../interfaces/Producto';
import { ResponseProducto } from '../../interfaces/ResponseProducto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.API_URL;

  constructor() { }

  // MÉTODO HARDCODEADO - TEMPORAL PARA DESARROLLO
  lista(): Observable<ResponseProducto>{
    const productosSimulados: Producto[] = [
      {
        idProducto: 1,
        nombre: "iPhone 15 Pro",
        marca: "Apple",
        precio: 1200.99
      },
      {
        idProducto: 2,
        nombre: "Galaxy S24 Ultra",
        marca: "Samsung",
        precio: 1100.50
      },
      {
        idProducto: 3,
        nombre: "MacBook Air M2",
        marca: "Apple",
        precio: 1399.00
      },
      {
        idProducto: 4,
        nombre: "Surface Pro 9",
        marca: "Microsoft",
        precio: 999.99
      },
      {
        idProducto: 5,
        nombre: "ThinkPad X1 Carbon",
        marca: "Lenovo",
        precio: 1299.75
      },
      {
        idProducto: 6,
        nombre: "PlayStation 5",
        marca: "Sony",
        precio: 499.99
      },
      {
        idProducto: 7,
        nombre: "Xbox Series X",
        marca: "Microsoft",
        precio: 499.00
      },
      {
        idProducto: 8,
        nombre: "AirPods Pro 2",
        marca: "Apple",
        precio: 249.99
      },
      {
        idProducto: 9,
        nombre: "Galaxy Buds2 Pro",
        marca: "Samsung",
        precio: 199.50
      },
      {
        idProducto: 10,
        nombre: "iPad Pro 12.9",
        marca: "Apple",
        precio: 1099.00
      }
    ];

    // Simular respuesta exitosa con delay
    return of({
      isSuccess: true,
      value: productosSimulados
    });
  }

    // lista(): Observable<ResponseProducto>{
    //   return this.http.get<ResponseProducto>(`${this.baseUrl}producto/listar`)
    // }


}
