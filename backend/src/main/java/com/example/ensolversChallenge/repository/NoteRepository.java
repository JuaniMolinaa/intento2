package com.example.ensolversChallenge.repository;

import com.example.ensolversChallenge.Enum.State;
import com.example.ensolversChallenge.entity.Note;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note,Long> {

	Note save(Note note);

	List<Note> findAll();

	Optional<Note> findById(long id);

	List<Note> findByState(State state);


	/*@Query("SELECT n FROM notes n Where n.id = :id")
	    public Optional<Notes> findById(@Param("id")Long id);*/
}
