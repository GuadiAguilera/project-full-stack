import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Note from '../../../models/Note';
import { NoteService } from '../../services/note.service';
import { NoteDTO } from '../../../models/NoteDTO';

@Component({
  selector: 'app-create-notes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-notes.component.html',
  styleUrl: './create-notes.component.css',
})
export class CreateNotesComponent {
  noteTitle: string = '';
  noteContent: string = '';

  constructor(public noteService: NoteService) {}

  handleSubmit = () => {
    if (!this.noteTitle) return;

    const newNote: NoteDTO = {
      title: this.noteTitle,
      content: this.noteContent, // Inicializar contenido vacío
      completed: false,
    };

    this.createNote(newNote);
  };

  createNote(newNote: NoteDTO) {
    this.noteService.createNote(newNote).subscribe({
      next: (response) => {
        // Agregar la nueva nota directamente al array local
        this.getNotes();
        this.noteTitle = "";
        this.noteContent = "";
        console.log('Nota creada exitosamente:', response);
      },
      error: (error) => {
        // En caso de error, agregar la nota localmente de todas formas
        console.error('Error al crear nota en servidor, guardando localmente:', error);
        this.noteTitle = "";
        this.noteContent = "";
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
