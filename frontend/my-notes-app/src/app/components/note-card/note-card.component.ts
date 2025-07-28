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

  updateTitle(id: string | undefined, event: any) {

    if (!id) return;
    const inputHtml = event.target as HTMLInputElement;
    this.noteService.updateTitle(id, inputHtml.value);
  }

  updateCompleted(id: string | undefined) {
    if (!id) return;
    this.noteService.updateCompleted(id);
  }
}
