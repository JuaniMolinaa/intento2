import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ActiveNotes from './pages/ActiveNotes';
import ArchivedNotes from './pages/ArchivedNotes';

export default function App() {
  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Notas</h1>
      <nav className="mb-4 space-x-4">
        <Link to="/">Notas Activas</Link>
        <Link to="/archived">Notas Archivadas</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ActiveNotes />} />
        <Route path="/archived" element={<ArchivedNotes />} />
      </Routes>
    </div>
  );
}