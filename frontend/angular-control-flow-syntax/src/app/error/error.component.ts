import { Component, OnInit } from '@angular/core';
import { ErrorComponentChild } from './error-child.component';



@Component({
  selector: 'app-error',
  standalone: true,
  imports: [ErrorComponentChild],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {
  // Manejo de errores
  //@error -> se usa para manejar los errores de render, si algun componente no se puede renderizar o explota, se controla donde queremos
  // se usa para la stream architecture -> cada componente se va a encargar de sus propios datos y de su propio manejo de errores
  // se utiliza cuando es un error del servidor tratando de crear el componente, ahi crea el error

  isContentReady = false;

  ngOnInit() {
    setTimeout(() => {
      this.isContentReady = true;
    }, 3000);
  }

  apretame(){
    alert('Button clicked');
  }
}