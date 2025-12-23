import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteItem shows a compact row for a note.
 */
export default function NoteItem({ note, onOpen, onDelete }) {
  const snippet =
    (note.content || '').length > 120
      ? note.content.slice(0, 120).trim() + '…'
      : (note.content || '').trim();

  const updated = new Date(note.updatedAt || note.createdAt || Date.now());
  const updatedStr = updated.toLocaleString();

  const handleDelete = (e) => {
    e.stopPropagation();
    const ok = window.confirm(`Delete note "${note.title || 'Untitled'}"?`);
    if (ok) onDelete(note);
  };

  return (
    <div className="note-item" role="button" tabIndex={0}
         onClick={() => onOpen(note)}
         onKeyDown={(e) => { if (e.key === 'Enter') onOpen(note); }}>
      <div>
        <h3 className="note-title">{note.title || 'Untitled'}</h3>
        <p className="note-snippet">{snippet || 'No content'}</p>
        <div className="note-meta">
          <span>Updated: {updatedStr}</span>
        </div>
      </div>
      <div className="note-actions">
        <button className="btn" onClick={handleDelete} aria-label="Delete note">Delete</button>
      </div>
    </div>
  );
}
