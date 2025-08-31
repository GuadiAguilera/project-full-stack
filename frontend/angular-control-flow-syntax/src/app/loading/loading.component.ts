import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit {

  // DIFERENCIA ENTRE LOADING Y PLACEHOLDER
  // LOADING: CUANTO TIEMPO VA A TARDAR EN RENDERIZAR EL COMPONENTE. se usa para controlar la carga. 
  //Cuando se empieza a cargar algo, placeholder es "mintras yo no tenga esa data.. ", pero cuando se tiene la data, entra en juego el loading.
  // PLACEHOLDER: MUESTRA UN CONTENIDO TEMPORAL MIENTRAS SE CARGA EL COMPONENTE

  // loading tiene dos parametros(after (especifica el tiempo que se debe esperar antes de mostrar el contenido una vez que loading empieza a ejecutarse) y minimo (tiempo minimo que tiene que ejecutarse el contenido del loading, esto es para asegurarse que las personas van a ver el conenido de la carga)) 
  //        muestra algo mientras lo del defer ya se cumple y empieza a cargar
  isContentReady = false;

  ngOnInit() {
    setTimeout(() => {
      this.isContentReady = true;
    }, 3000);
  }
}
