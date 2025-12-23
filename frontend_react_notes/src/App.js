import React from 'react';
import './styles/theme.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import EditorModal from './components/EditorModal';
import EmptyState from './components/EmptyState';
import { useNotes } from './hooks/useNotes';

/**
 * PUBLIC_INTERFACE
 * App is the root component rendering the layout, list panel, and editor modal.
 */
function App() {
  const {
    notes,
    filteredNotes,
    search,
    sort,
    setSearch,
    setSort,
    openEditor,
    closeEditor,
    isEditorOpen,
    currentNote,
    createNew,
    saveNote,
    deleteNote,
    hasAnyNotes,
  } = useNotes();

  return (
    <div className="app-shell">
      <Header onAdd={createNew} />

      <main className="layout">
        <section className="panel" aria-label="Notes list">
          <div className="panel-header">
            <div className="controls-row">
              <input
                className="input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                aria-label="Search notes"
              />
              <select
                className="select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort notes"
              >
                <option value="updatedAt">Sort: Last updated</option>
                <option value="title">Sort: Title</option>
              </select>
            </div>
            <div className="controls-row">
              <button className="btn btn-primary" onClick={createNew} aria-label="Add note">
                + New Note
              </button>
            </div>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="empty-state">
              {hasAnyNotes ? (
                <EmptyState
                  title="No notes match your search"
                  description="Try a different search term or clear the filters."
                />
              ) : (
                <EmptyState
                  title="No notes yet"
                  description="Create your first note to get started."
                  actionLabel="Create a note"
                  onAction={createNew}
                />
              )}
            </div>
          ) : (
            <div className="list">
              <NotesList
                notes={filteredNotes}
                onOpen={(note) => openEditor(note)}
                onDelete={(note) => deleteNote(note.id)}
              />
            </div>
          )}
        </section>

        <section className="panel" aria-label="Editor panel">
          <div className="editor-placeholder">
            Select a note to edit or create a new one.
          </div>
        </section>
      </main>

      <EditorModal
        isOpen={isEditorOpen}
        note={currentNote}
        onClose={closeEditor}
        onSave={saveNote}
      />
    </div>
  );
}

export default App;
