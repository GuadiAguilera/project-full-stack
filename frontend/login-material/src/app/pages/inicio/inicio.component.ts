import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../../interfaces/Producto';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  private productoService = inject(ProductoService);
  public listaProductos: Producto[] = [];
  public displayedColumns:string[] = ['nombre', 'marca', 'precio'];

  constructor() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.lista().subscribe({
      next: (data) => {
        if(data.value.length > 0) {
          this.listaProductos = data.value;
        }
      },
      error: (error) => {
        console.error("Error al cargar productos:", error.message);
        alert("Ocurrió un error al cargar los productos");
      }
    });
  }

}
