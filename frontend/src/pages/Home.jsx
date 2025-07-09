import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editing, setEditing] = useState(false);
  const [noteBeingEdited, setNoteBeingEdited] = useState(null);
  const [createVisible, setCreateVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [filter, setFilter] = useState('ALL');

  const fetchNotes = async (state = 'ALL') => {
    try {
      let res;
      if (state === 'ALL') {
        res = await axios.get('/api/notes/notes');
      } else {
        res = await axios.get(`/api/notes/noteState/${state}`);
      }
      setNotes(res.data);
    } catch (err) {
      console.error('Error al obtener notas:', err);
    }
  };

  const handleCreateNote = async () => {
    try {
      await axios.post('/api/notes/addNote', { title, body });
      alert('Note created succesfully');
      setTitle('');
      setBody('');
      fetchNotes(filter);
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notes/delete/${id}`);
      alert('Note deleted');
      fetchNotes(filter);
    } catch (err) {
      console.error('Error deleting note:', err);
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
      alert('Note updated succesfully');
      setEditing(false);
      setNoteBeingEdited(null);
      setTitle('');
      setBody('');
      fetchNotes(filter);
    } catch (err) {
      console.error('Error uptading note:', err);
    }
  };

  const toggleNotesVisible = () => {
    if (!notesVisible) fetchNotes(filter);
    setNotesVisible(!notesVisible);
  };

  useEffect(() => {
    if (notesVisible) {
      fetchNotes(filter);
    }
  }, [filter]);

  return (
    <div className="container d-flex flex-column align-items-center mt-5 px-3" style={{ minHeight: '100vh' }}>
      <h1 className="text-center mb-4">Personal Notes</h1>

      <div className="d-flex justify-content-center gap-3 mb-4">
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
          {createVisible ? 'Hide Form' : 'Create Note'}
        </button>

        <button onClick={toggleNotesVisible} className="btn btn-success">
          {notesVisible ? 'Hide Notes' : 'See Notes'}
        </button>
      </div>

      {notesVisible && (
        <div className="mb-4 d-flex align-items-center gap-2">
          <label className="form-label mb-0"><strong>Filter by State:</strong></label>
          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">ALL</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
      )}

      {createVisible && (
        <div className="card p-4 mb-4">
          <div className="mb-3">
            <h4>Form</h4>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Body"
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

                    alert(`Nota ${newState === 'ACTIVE' ? 'Activate' : 'Archived'}`);
                    setNoteBeingEdited({
                      ...noteBeingEdited,
                      state: newState
                    });

                    fetchNotes(filter);
                  } catch (err) {
                    console.error('Error changing state:', err);
                  }
                }}
                className="btn btn-secondary"
              >
                {noteBeingEdited.state === 'ACTIVE' ? 'Archived' : 'Activate'}
              </button>
            )}
            {editing ? (
              <button onClick={handleUpdateNote} className="btn btn-warning">
                Save Changes
              </button>
            ) : (
              <button onClick={handleCreateNote} className="btn btn-primary">
                Create
              </button>
            )}
          </div>
        </div>
      )}

      {notesVisible && (
        <div className="row row-cols-1 g-4">
          <h4>Notes:</h4>
          {notes.map((note) => (
            <div className="col" key={note.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.body}</p>
                  <p className="card-text"><small className="text-muted">State: {note.state}</small></p>
                  <p className="card-text"><small className="text-muted">Date: {note.datetime}</small></p>
                </div>
                <div className="card-footer d-flex gap-2">
                  <button onClick={() => handleEdit(note)} className="btn btn-warning btn-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(note.id)} className="btn btn-danger btn-sm">
                    Delete
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
