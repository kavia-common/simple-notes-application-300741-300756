/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { loadNotes, saveNotes } from '../utils/storage';
import { sortNotes, filterNotes } from '../utils/filters';

// Simple UUID v4 generator (not cryptographically secure)
function uuidv4() {
  // PUBLIC_INTERFACE
  // Generate a UUID-like string
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const initialState = {
  notes: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, notes: action.payload || [] };
    case 'ADD': {
      const notes = [action.payload, ...state.notes];
      return { ...state, notes };
    }
    case 'UPDATE': {
      const notes = state.notes.map((n) => (n.id === action.payload.id ? action.payload : n));
      return { ...state, notes };
    }
    case 'DELETE': {
      const notes = state.notes.filter((n) => n.id !== action.payload);
      return { ...state, notes };
    }
    default:
      return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * useNotes provides state, CRUD operations, and UI helpers for the Notes app.
 */
export function useNotes() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('updatedAt');

  // Editor modal management
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  // Initialize from storage
  useEffect(() => {
    const notes = loadNotes();
    dispatch({ type: 'INIT', payload: notes });
  }, []);

  // Persist on changes
  useEffect(() => {
    saveNotes(state.notes);
  }, [state.notes]);

  const openEditor = useCallback((note) => {
    setCurrentNote(note || null);
    setEditorOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setEditorOpen(false);
    setCurrentNote(null);
  }, []);

  const createNew = useCallback(() => {
    openEditor({
      id: uuidv4(),
      title: '',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }, [openEditor]);

  const saveNote = useCallback((note) => {
    const now = Date.now();
    if (!note.id) {
      note.id = uuidv4();
      note.createdAt = now;
    }
    note.updatedAt = now;

    const exists = state.notes.some((n) => n.id === note.id);
    if (exists) {
      dispatch({ type: 'UPDATE', payload: note });
    } else {
      dispatch({ type: 'ADD', payload: note });
    }
    setEditorOpen(false);
    setCurrentNote(null);
  }, [state.notes]);

  const deleteNote = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  const hasAnyNotes = state.notes.length > 0;

  const filteredNotes = useMemo(() => {
    const filtered = filterNotes(state.notes, search);
    return sortNotes(filtered, sort);
  }, [state.notes, search, sort]);

  return {
    notes: state.notes,
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
  };
}
