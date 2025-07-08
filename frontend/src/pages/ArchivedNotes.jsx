import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteList from '../components/NoteList';

export default function ArchivedNotes() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:8080/api/notes/archived');
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <NoteList notes={notes} onChange={fetchNotes} />
    </div>
  );
}
