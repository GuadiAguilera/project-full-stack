import { HttpClient } from '@angular/common/http';
import { inject,signal, Injectable } from '@angular/core';
import { Character } from '../models';
import { map, Observable, of } from 'rxjs';
import { characterAdapter } from '../adapters';

// Diferencia entre promise y observable
// - promise -> promete que algo va a suceder aunque termine bien o mal. se cumple una sola vez
// - observable ->es un canal de comunicacion. Los componentes escuchan, observan el contenido que pasa por el canal de comunicacion. Se pueden adaptar los resultados a lo que querramos

// signal - > es un canal de comunicacion que permite a los componentes reaccionar a los cambios en el estado de la aplicacion.
@Injectable({
  providedIn: 'root' // root -> se inyecta a nivel global, a nivel aplicacion, una unica instancia del servicio
})
export class CharacterService {

  // private apiUrl = 'https://api.example.com/characters';
  // private https = inject(HttpClient); // HttpClient -> es un modulo que brinda funcionalidades para hacer peticiones al backend
  // // como usamos inject no es necesario utilizar el constructor

  state = signal({ // la señal va a manejar todo lo que tiene que ver con los personajes
    characters: new Map<number, Character>(), // el map es para tener un acceso rapido a los personajes por id
  });

  constructor(){
    this.getCharacters();
  }

  //Con esta arquitectura, todos los que escuchan a getFormattedCharacters van a estar siempre actualizados. Si alguien esta escuchando a getFormattedCharacters y en cualquier parte de la aplicacion se elimina un character, al tener un state automaticamente se modifican todas las referencias 
  //Si alguien esta escuchando el getFormattedCharacters
  getFormattedCharacters(): Character[] {
    return Array.from(this.state().characters.values());
  }

  // getCharacters(): Observable<Character[]> {
  //   return this.https.get<Character[]>(this.apiUrl).pipe(map((characters) => characterAdapter(characters)));
  // }

  // updateCharacter(character: Character): Observable<Character> {
  //   return this.https.put<Character>(`${this.apiUrl}`, character);
  // }

  // deleteCharacter(id: number): Observable<void> {
  //   return this.https.delete<void>(`${this.apiUrl}/${id}`);
  // }

  // Esto se hace para hacer un cambio de referencia 
  // le dice al state que es una señal y se le va amandar un nuevo valor, que es lo que ya se tiene adentro
  // esto lo hacemos para que las cosas reacciones. Si alguien estaba escuchando al state detecta que habia un cambio
  // NO es necesario que se devuelva algo, cualquier entidad, componente que estaba escuchando automaticamente cambia el estado
  getCharacters(): void {
    const mockCharacters: Character[] = [
      { id: 1, name: 'Jhon', lastName: 'Character 1', age: 30 },
      { id: 2, name: 'Jane', lastName: 'Character 2', age: 25 },
      { id: 3, name: 'Doe', lastName: 'Character 3', age: 35 },
    ];
    of(mockCharacters)
    .subscribe(result => {
      result.forEach(character => this.state().characters.set(character.id, character));
      this.state.set({characters: this.state().characters}) // set reemplaz todo lo que esta dentro de la señal
    });
  }

  updateCharacter(character: Character): void {
      const updatedCharacters = {... character};

      of(updatedCharacters).subscribe(result => {
        this.state.update((state) => {
          state.characters.set(result.id, result);
          return {characters: state.characters};
        })
      });

    this.getCharacters();
  }

  deleteCharacter(id: number): void {
    of({status: 200}).subscribe(() => {
      this.state.update((state) => {
        state.characters.delete(id);
        return {characters: state.characters};
      })
    })
  }

  getCharacterById(id: number){
    return of(this.state().characters.get(id));
  }
}

// TODO ESTO TAMBIEN SE PUEDE HACER CON LA LIBRERIA SignalStore
