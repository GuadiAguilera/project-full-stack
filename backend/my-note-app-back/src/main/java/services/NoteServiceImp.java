package services;

import entities.Note;
import entities.dtos.NoteDTO;
import entities.dtos.NoteUpdateDTO;
import entities.mapper.NoteMapper;
import entities.mapper.NoteUpdateMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import repositories.NoteRepository;

import java.util.List;
import java.util.NoSuchElementException;

@ApplicationScoped
public class NoteServiceImp implements NoteServiceInt {

    @Inject
    private NoteMapper noteMapper;
    @Inject
    private NoteRepository noteRepository;
    @Inject
    private NoteUpdateMapper noteUpdateMapper;

    @Override
    public boolean isIdNote(Integer id) {
        return noteRepository.findById(Long.valueOf(id)) != null;
    }

    @Override
    public Note save(NoteDTO noteDTO) {
        Note note = noteMapper.toEntity(noteDTO);
        noteRepository.persist(note);
        return note;
    }

    @Override
    public void completedNote(Integer id) {
        Note note = noteRepository.findById(Long.valueOf(id));
        note.setCompleted(true);
        noteRepository.getEntityManager().merge(note);
    }

    @Override
    public List<Note> getAll() {
        List<Note> notes = noteRepository.listAll();
        return notes.isEmpty() ? List.of() : notes;
    }

    @Override
    public Note updateNote(NoteUpdateDTO noteDTO) {
        Note note = noteRepository.findById(Long.valueOf(noteDTO.getId()));
        // MapStruct actualiza solo lo que viene en el DTO
        noteUpdateMapper.updateEntityFromDto(noteDTO, note);

        // Quarkus Panache detecta cambios automáticamente si estás en una transacción activa.
        // Pero si querés asegurarte:
        noteRepository.getEntityManager().merge(note);

        return note;
    }
}
