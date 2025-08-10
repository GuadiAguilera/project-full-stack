import { Injectable } from '@angular/core';
import Note from '../../models/Note';
import { NoteDTO, NoteUpdateDTO } from '../../models/NoteDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly API_URL = "http://localhost:8080/notes";
  notes: Note[];

  constructor(private http: HttpClient) {
    this.notes = [];
  }

  getNotes() {
    return this.http.get<Note[]>(this.API_URL);
  }

  // POST /notes - Crear una nueva nota
  createNote(note: NoteDTO) {
    const noteDTO: NoteDTO = {
      title: note.title,
      content: note.content,
      completed: false
    };
    return this.http.post<Note>(this.API_URL, noteDTO);
  }

  // PUT /notes/{id} - Marcar nota como completada
  completedNote(id: number) {
    return this.http.put(`${this.API_URL}/${id}`, {});
  }

  // PUT /notes - Actualizar nota completa
  updateNote(noteUpdate: NoteUpdateDTO) {
    return this.http.put<Note>(this.API_URL, noteUpdate);
  }
}
