package controllers;


import entities.Note;
import entities.dtos.NoteDTO;
import entities.dtos.NoteUpdateDTO;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import services.NoteServiceImp;

import java.util.List;
import java.util.NoSuchElementException;

@Path("/notes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional

public class NoteController {
    @Inject
    private NoteServiceImp noteService;

    @GET
    public Response getAllNotes() {
        try {
            List<Note> notes = noteService.getAll();
            if (notes.isEmpty()) {
                return Response.status(Response.Status.NO_CONTENT).build(); // 204 No Content
            }else{
                return Response.ok(notes).build(); // 200 OK
            }
        } catch (NoSuchElementException e) {
            return Response.status(Response.Status.NOT_FOUND).build(); // 404
        }
    }

    @POST
    public Response createNote(NoteDTO noteDTO) {
        Note created =  noteService.save(noteDTO);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT()
    @Path("/{id}")
    public Response completedNote(@PathParam("id") Integer id){
        try {
            boolean idNote = noteService.isIdNote(id);
            if(!idNote) {
                return Response.status(Response.Status.NO_CONTENT).build(); // 204 No Content
            }
            else{
                noteService.completedNote(id);
                return Response.ok().build(); // 200 OK
            }
        } catch (NoSuchElementException e) {
            return Response.status(Response.Status.NOT_FOUND).build(); // 404 Not Found
        }
    }

    @PUT
    public Response updateNote(NoteUpdateDTO noteDTO) {
        try {
            boolean idNote = noteService.isIdNote(noteDTO.getId());
            if (!idNote) {
                return Response.status(Response.Status.NO_CONTENT).build(); // 204 No Content
            }
            Note updated = noteService.updateNote(noteDTO);
            return Response.ok(updated).build(); // 200 OK
        } catch (NoSuchElementException e) {
            return Response.status(Response.Status.NOT_FOUND).build(); // 404 Not Found
        }
    }
}
