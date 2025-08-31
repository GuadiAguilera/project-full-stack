import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-error-child',
  standalone: true,
  imports: [],
  template: `<p>Hola</p>`,
  styleUrl: './error.component.css'
})
export class ErrorComponentChild implements OnInit {
  ngOnInit() {
    throw new Error('Error al cargar el componente');
  }
}