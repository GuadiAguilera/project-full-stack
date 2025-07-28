import { Injectable } from '@angular/core';
import Note from '../../models/Note';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  readonly API_URL = "aaaahttps://my-note-app.free.beeceptor.com/notes";
  notes: Note[];

  constructor(private http : HttpClient) {
    this.notes = [];
  }

  getNotes() {
    return this.http.get<Note[]>(this.API_URL);
  }

  createNote(note: Note){
    return this.http.post<Note>(this.API_URL, note);
  }

  updateTitle(id: string, title: string) {
    const updatedNote = this.notes.find((note) => note.id === id);
    if (updatedNote) {
      updatedNote.title = title;
      console.log('Título actualizado localmente:', updatedNote);
    }
  }

  updateCompleted(id: string) {
    const updatedNote = this.notes.find((note) => note.id === id);
    if (!updatedNote) return;
    updatedNote.completed = !updatedNote.completed;
    console.log('Estado actualizado localmente:', updatedNote);
  }

  deleteNote(id: string) {
    this.notes = this.notes.filter((note) => note.id !== id);
    console.log('Nota eliminada localmente:', id);
  }

  createId = () => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  };

}
