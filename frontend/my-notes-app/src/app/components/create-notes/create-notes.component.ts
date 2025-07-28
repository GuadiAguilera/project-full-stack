import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Note from '../../../models/Note';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-create-notes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-notes.component.html',
  styleUrl: './create-notes.component.css',
})
export class CreateNotesComponent {
  noteTitle: string = '';

  constructor(public noteService: NoteService) {}

  handleSubmit = () => {
    if (!this.noteTitle) return;

    const newNote: Note = {
      id: this.noteService.createId(),
      title: this.noteTitle,
      completed: false,
    };

    this.createNote(newNote);
  };

  createNote(newNote: Note) {
    this.noteService.createNote(newNote).subscribe({
      next: (response) => {
        // Agregar la nueva nota directamente al array local
        this.noteService.notes.push(newNote);
        this.getNotes();
        this.noteTitle = "";
        console.log('Nota creada exitosamente:', response);
      },
      error: (error) => {
        // En caso de error, agregar la nota localmente de todas formas
        console.error('Error al crear nota en servidor, guardando localmente:', error);
        this.noteTitle = "";
      },
    });
  }

  getNotes() {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        this.noteService.notes = data.reverse();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
