package services;

import entities.Note;
import entities.dtos.NoteDTO;
import entities.dtos.NoteUpdateDTO;

import java.util.List;

public interface NoteServiceInt {
    boolean isIdNote(Integer id);

    Note save(NoteDTO note);

    void completedNote(Integer id);

    List<Note> getAll();

    Note updateNote(NoteUpdateDTO noteDTO);
}
