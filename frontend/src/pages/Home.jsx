import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editing, setEditing] = useState(false);
  const [noteBeingEdited, setNoteBeingEdited] = useState(null);
  const [createVisible, setCreateVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('/api/notes/notes');
      setNotes(res.data);
    } catch (err) {
      console.error('Error al obtener notas:', err);
    }
  };

  const handleCreateNote = async () => {
    try {
      await axios.post('/api/notes/addNote', { title, body });
      alert('Nota creada exitosamente');
      setTitle('');
      setBody('');
      fetchNotes();
    } catch (err) {
      console.error('Error al crear nota:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notes/delete/${id}`);
      alert('Nota eliminada');
      fetchNotes();
    } catch (err) {
      console.error('Error al eliminar nota:', err);
    }
  };

  const handleEdit = (note) => {
    setEditing(true);
    setCreateVisible(true);
    setNoteBeingEdited(note);
    setTitle(note.title);
    setBody(note.body);
  };

  const handleUpdateNote = async () => {
    if (!noteBeingEdited) return;

    try {
      await axios.put('/api/notes/update', {
        id: noteBeingEdited.id,
        title,
        body,
        state: noteBeingEdited.state,
        datetime: noteBeingEdited.datetime
      });
      alert('Nota actualizada correctamente');
      setEditing(false);
      setNoteBeingEdited(null);
      setTitle('');
      setBody('');
      fetchNotes();
    } catch (err) {
      console.error('Error al actualizar nota:', err);
    }
  };

  const toggleNotesVisible = () => {
    if (!notesVisible) fetchNotes();
    setNotesVisible(!notesVisible);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Notas Personales</h1>

      <div className="d-flex justify-content-center mb-4 gap-3">
        <button
          onClick={() => {
            setCreateVisible(!createVisible);
            setEditing(false);
            setNoteBeingEdited(null);
            setTitle('');
            setBody('');
          }}
          className="btn btn-primary"
        >
          {createVisible ? 'Ocultar Formulario' : 'Crear Nota'}
        </button>

        <button
          onClick={toggleNotesVisible}
          className="btn btn-success"
        >
          {notesVisible ? 'Ocultar Notas' : 'Ver Notas'}
        </button>
      </div>

      {createVisible && (
        <div className="card p-4 mb-4">
          <div className="mb-3">
            <h4>Crear Nota</h4>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Contenido"
              className="form-control"
              rows={4}
            />
          </div>
          <div className="d-flex gap-2">
            {editing && noteBeingEdited && (
              <button
                onClick={async () => {
                  try {
                    const newState = noteBeingEdited.state === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE';
                    await axios.put('/api/notes/update', {
                      id: noteBeingEdited.id,
                      title,
                      body,
                      state: newState,
                      datetime: noteBeingEdited.datetime
                    });
                    alert(`Nota ${newState === 'ACTIVE' ? 'activada' : 'archivada'}`);
                    setNoteBeingEdited({
                      ...noteBeingEdited,
                      state: newState
                    });
                    fetchNotes();
                  } catch (err) {
                    console.error('Error al cambiar estado:', err);
                  }
                }}
                className="btn btn-secondary"
              >
                {noteBeingEdited.state === 'ACTIVE' ? 'Archivar' : 'Activar'}
              </button>
            )}
            {editing ? (
              <button onClick={handleUpdateNote} className="btn btn-warning">
                Guardar Cambios
              </button>
            ) : (
              <button onClick={handleCreateNote} className="btn btn-primary">
                Crear
              </button>
            )}
          </div>
        </div>
      )}

      {notesVisible && (
        <div className="row row-cols-1 g-4">
            <h4>Notas Creadas</h4>
          {notes.map((note) => (
            <div className="col" key={note.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.body}</p>
                  <p className="card-text"><small className="text-muted">Estado: {note.state}</small></p>
                  <p className="card-text"><small className="text-muted">Fecha: {note.datetime}</small></p>
                </div>
                <div className="card-footer d-flex gap-2">
                  <button onClick={() => handleEdit(note)} className="btn btn-warning btn-sm">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(note.id)} className="btn btn-danger btn-sm">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}