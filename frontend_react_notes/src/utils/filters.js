/**
 * Utilities for sorting and filtering notes.
 */

// PUBLIC_INTERFACE
export function sortNotes(notes, sortKey = 'updatedAt') {
  /** Returns a new array sorted by sortKey ('updatedAt' or 'title'). */
  const arr = [...notes];
  if (sortKey === 'title') {
    return arr.sort((a, b) =>
      (a.title || '').localeCompare(b.title || '', undefined, { sensitivity: 'base' })
    );
  }
  // default updatedAt desc
  return arr.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
}

// PUBLIC_INTERFACE
export function filterNotes(notes, query) {
  /** Filters notes by query in title or content (case-insensitive). */
  if (!query) return notes;
  const q = query.toLowerCase();
  return notes.filter((n) => {
    const t = (n.title || '').toLowerCase();
    const c = (n.content || '').toLowerCase();
    return t.includes(q) || c.includes(q);
  });
}
