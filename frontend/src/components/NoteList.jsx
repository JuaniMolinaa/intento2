import React from 'react';
import NoteItem from './NoteItem';

export default function NoteList({ notes, onChange }) {
  if (notes.length === 0) return <p>No hay notas.</p>;
  return (
    <div>
      {notes.map(note => (
        <NoteItem key={note.id} note={note} onChange={onChange} />
      ))}
    </div>
  );
}