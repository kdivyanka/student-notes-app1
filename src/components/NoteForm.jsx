import React, { useState, useEffect } from 'react';

function NoteForm({ onSubmit, onClose, initialData = null }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    onSubmit({
      id: initialData ? initialData.id : Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: initialData ? initialData.createdAt : new Date().toISOString()
    });
  };

  return (
    <div className="form-overlay">
      <div className="glass-panel form-container">
        <h2>{initialData ? 'Edit Note' : 'Create New Note'}</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <input 
            type="text" 
            placeholder="Note Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <textarea 
            placeholder="Write your note here..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
          />
          <div className="form-actions">
            <button type="button" className="secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary">Save Note</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;
