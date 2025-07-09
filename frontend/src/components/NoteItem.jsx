import React from 'react';
import axios from 'axios';

export default function NoteItem({ note, onChange }) {
  const toggleArchived = async () => {
    await axios.put('/api/notes/${note.id}/toggle-archive');
    onChange();
  };

  const handleDelete = async () => {
    await axios.delete('/api/notes/delete/${note.id}');
    onChange();
  };

  return (
    <div className="border p-3 rounded mb-2">
      <p>{note.content}</p>
      <div className="text-sm mt-2">
        <button onClick={toggleArchived} className="mr-2 text-blue-600">
          {note.archived ? 'Desarchivar' : 'Archivar'}
        </button>
        <button onClick={handleDelete} className="text-red-600">Eliminar</button>
      </div>
    </div>
  );
}