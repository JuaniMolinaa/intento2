import React, { useState } from 'react';
import axios from 'axios';

export default function NoteForm({ onNoteAdded }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await axios.post('http://localhost:8080/api/notes', { content });
    setContent('');
    onNoteAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full"
        rows={3}
        placeholder="Escribe una nota..."
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">Agregar</button>
    </form>
  );
}