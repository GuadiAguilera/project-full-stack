import { Component } from '@angular/core';

@Component({
  selector: 'app-advanced-defer',
  standalone: true,
  imports: [],
  templateUrl: './advanced-defer.component.html',
  styleUrl: './advanced-defer.component.css'
})
export class AdvancedDeferComponent {
  // @defer (on idle) -> es un conector en el cual se indica que se quiere hacer algo sobre otra cosa
  // cuando el browser este idle, este disponible ahi lo va a cargar. Quiere decir que si el browser tiene muchas cosas que hacer, esto no es prioridad. Va a cargar todo y cuando ya este libre o no tenga tanto trabajo ahi lo carga
  //  es automatico, no se instala ningun import

  //@defer(on viewport) -> se va a cargar cuando el componente entra en el viewport
  // por ejemplo, si el componente esta al final del scrolleo, hasta que no llegue ese componente al viewport, lo que esta dentro no aparece 
  // se usa para hacer un scrolleo infinito, normalmente lo utiliza el contenedor
  // si o si necesita un placeholder que ocupe ese lugar


  //@defer(on viewport(triggerElement)) -> se va a cargar el elemento que esta en el defer cuando el elemento triggerElement se cargue

  //@defer(on interaction) para interactuar con el elemento. Cuando se interactue con el elemento, ya sea por un click o teclado, recien ahi se va a cargar

  //@defer(on prefetch) permite cargar los recusros asociados al bloque defer y que se muestre de manera diferida
  // pero se puede especificar cual es el trigger para poder hacer ese prefetch y va a asociaso a algo que ya existe, un defer ya existente
  // 
  protected dataReady = true;
}
