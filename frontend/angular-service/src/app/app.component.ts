import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterService } from './services';
import { Character } from './models';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush, // mejora el rendimiento de la aplicacion, angular no va a estar revisando constantemente los cambios en el componente, solo cuando cambien las entradas @Input o cuando se dispare un evento interno
  // solo 3 cosas van a hacer cambios en la app. 1 -> parametros de entrada. 2 -> cambios por interaccion del usuario. 3-> cambios por llamadas asincronas
})
export class AppComponent {
  title = 'angular-service';

  characterService = inject(CharacterService);

  characters: Character[] = [] as Character[];

  charactersSolos: Character[] = [] as Character[];

  // charactersAsync$: Observable<Character[]> = this.characterService.getCharacters(); // Esta es otra manera. Lo hace de manera asíncrona sin necesidad de la suscripción. Lo hace con asyncPipe
  // Lo bueno que tiene el pipeAsync es que automaticamente se suscribe y desuscribe cuando el componente se deja de existir

  //charactersSignals: Signal<Character[] | undefined> = toSignal(this.characterService.getCharacters(), ); // esto es otra forma de manejar los datos reactivos, con signals
  charactersSignals: Signal<Character[] | undefined> = computed(() =>
  this.characterService.getFormattedCharacters(),); // se crea una señal pero esa señal se va a basar en la que se tenga dentro. Computed dice que si cambia la señal que esta dentro se vuelve a recalcular, si alguien elimina algo, se vuelve a ejecutar y se ve la actualizacion en pantalla   
  constructor() {
    // this.characterService.getCharacters().pipe(takeUntilDestroyed()).subscribe((chars) => { // esta es una forma para destruir la instancia cuando no se utilice
    //   this.characters = chars;
    // })

    // this.characterService.getCharacters().subscribe((chars) => {
    //   this.charactersSolos = chars;
    // }); // angular en forma privada tiene un finish, cuando el observable emita un valor, ya sea bien o mal, finaliza el observable

  }
}
