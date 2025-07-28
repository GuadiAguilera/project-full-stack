import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NoteService } from '../../services/note.service';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { CreateNotesComponent } from '../../components/create-notes/create-notes.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [HeaderComponent, NoteCardComponent, CreateNotesComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
  hasError: boolean = false;
  isLoading: boolean = true;
  constructor(public noteService: NoteService) {
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        this.noteService.notes = data.reverse();
        this.isLoading = false;
        this.hasError = false;
      },
      error: (error) => {
        this.hasError = true;
        console.error(error);
      }
    });
  }


}
