import { Character } from "../models";

// Esta carpeta se hace porque se sigue la clean architecture
// esta arquitectura dice que tenemos que tener adaptadores para comunicar la logica de la aplicacion con entidades externas.
export const characterAdapter = (characters: Character[]) => 
    characters.map(c => ({...c, lastName: c.lastName.toUpperCase()})); // obtiene todos los personajes pero ADAPTADOS, con upperCase
