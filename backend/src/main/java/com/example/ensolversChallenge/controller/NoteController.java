package com.example.ensolversChallenge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ensolversChallenge.Enum.State;
import com.example.ensolversChallenge.entity.Note;
import com.example.ensolversChallenge.service.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService service;

    @PostMapping("/addNote")
    public Note addNote(@RequestBody Note note) {
        return service.save(note);
    }

    @PostMapping("/addNotes")
    public List<Note> addNotes(@RequestBody List<Note> notes) {
        return service.saveNotes(notes);
    }

    @GetMapping("/notes")
    public List<Note> findAllNotes() {
        return service.getNotes();
    }

    @GetMapping("/noteById/{id}")
    public Note findNoteById(@PathVariable Long id) {
        return service.getNoteById(id);
    }

    @GetMapping("/noteState/{state}")
    public Note findNoteByState(@PathVariable State state) {
        return service.getNoteByState(state);
    }

    @PutMapping("/update")
    public Note updateNote(@RequestBody Note note) {
        return service.updateNote(note);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteNote(@PathVariable Long id) {
        return service.deleteNote(id);
    }
}
