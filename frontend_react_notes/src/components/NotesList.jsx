import React from 'react';
import NoteItem from './NoteItem';

/**
 * PUBLIC_INTERFACE
 * NotesList renders the list of notes with callbacks.
 */
export default function NotesList({ notes, onOpen, onDelete }) {
  return (
    <div role="list" aria-label="Notes">
      {notes.map((n) => (
        <NoteItem key={n.id} note={n} onOpen={onOpen} onDelete={(note) => onDelete(note)} />
      ))}
    </div>
  );
}
