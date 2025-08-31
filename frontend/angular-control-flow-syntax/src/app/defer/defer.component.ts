import { Component } from '@angular/core';

@Component({
  selector: 'app-defer',
  standalone: true,
  imports: [],
  templateUrl: './defer.component.html',
  styleUrl: './defer.component.css'
})
export class DeferComponent {
  // permite cargar contenido de forma diferida segun una condificion
  // mejora el rendimiento, aplica lazy loading ya que retraza la carga de partes no criticas de la app

  isImageVisible = false;

  showImage() {
    this.isImageVisible = true;
  }
}
