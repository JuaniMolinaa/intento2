import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';

export default function ActiveNotes() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:8080/api/notes/active');
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <NoteForm onNoteAdded={fetchNotes} />
      <NoteList notes={notes} onChange={fetchNotes} />
    </div>
  );
}