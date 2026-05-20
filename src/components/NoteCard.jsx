import React from 'react';

function NoteCard({ note, onEdit, onDelete }) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="glass-panel note-card">
      <div>
        <div className="note-header">
          <h3 className="note-title">{note.title}</h3>
          <span className="note-date">{formattedDate}</span>
        </div>
        <p className="note-content">{note.content}</p>
      </div>
      <div className="note-actions">
        <button className="secondary" onClick={() => onEdit(note)}>Edit</button>
        <button className="danger" onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;
