import { Component, input } from '@angular/core';
import Note from '../../../models/Note';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {
  note = input<Note>();

  constructor(public noteService: NoteService) {
  }

  updateCompleted(id: number) {
    if (!id) return;
    this.noteService.completedNote(id).subscribe({
      next: () => {
        this.getNotes();
      },
      error: (error) => {
        console.error(`Error al marcar la nota ${id} como completada:`, error);
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
