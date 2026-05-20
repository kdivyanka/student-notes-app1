import React, { useState, useEffect } from 'react';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';
import './App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('studentNotes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    localStorage.setItem('studentNotes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (noteData) => {
    if (editingNote) {
      setNotes(notes.map(n => n.id === noteData.id ? noteData : n));
    } else {
      setNotes([noteData, ...notes]);
    }
    setIsFormOpen(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const openNewNoteForm = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Notes</h1>
        <button className="primary" onClick={openNewNoteForm}>
          + Create New Note
        </button>
      </header>

      {notes.length === 0 ? (
        <div className="empty-state glass-panel">
          <p>No notes yet. Click the button above to create your first note!</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onEdit={handleEditNote} 
              onDelete={handleDeleteNote} 
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <NoteForm 
          onSubmit={handleSaveNote} 
          onClose={() => {
            setIsFormOpen(false);
            setEditingNote(null);
          }}
          initialData={editingNote}
        />
      )}
    </div>
  );
}

export default App;
