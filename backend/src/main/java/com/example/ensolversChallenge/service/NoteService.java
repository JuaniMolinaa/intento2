package com.example.ensolversChallenge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

import com.example.ensolversChallenge.Enum.State;
import com.example.ensolversChallenge.entity.Note;
import com.example.ensolversChallenge.repository.NoteRepository;

@Service
public class NoteService {
    @Autowired
    private NoteRepository repository;

    public Note save(Note note) {
		note.setState(State.ACTIVE);
		note.setDatetime(new Date());
        return repository.save(note);
    }

    public List<Note> saveNotes(List<Note> notes) {
        return repository.saveAll(notes);
    }

    public List<Note> getNotes() {
        return repository.findAll();
    }

    public Note getNoteById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Note> getNotesByState(State state) {
        return repository.findByState(state);
    }
    
    public String deleteNote(Long id) {
        repository.deleteById(id);
        return "Note removed! " + id;
    }

	
	//allows to change and (if the note selected exists) persist the change saving it
	public Note updateNote(Note note) {
		Note existingNote = repository.findById(note.getId()).orElse(null);
		existingNote.setTitle(note.getTitle());
		existingNote.setBody(note.getBody());
		existingNote.setState(note.getState());
		existingNote.setDatetime(note.getDatetime());
		return repository.save(existingNote);
	}
}
