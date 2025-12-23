/**
 * Storage helpers for notes with schema versioning and basic migration.
 */

const CURRENT_VERSION = 1;
const STORAGE_KEY = `notesapp.v${CURRENT_VERSION}.data`;

// Legacy keys to migrate from (if found)
const LEGACY_KEYS = [
  'notesapp.data', // v0
];

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed;
  } catch {
    return fallback;
  }
}

function migrateIfNeeded() {
  // If current key exists, use it
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return safeParse(existing, { version: CURRENT_VERSION, notes: [] });
  }

  // Try legacy keys
  for (const key of LEGACY_KEYS) {
    const raw = localStorage.getItem(key);
    if (raw) {
      const data = safeParse(raw, []);
      // Basic transform into new shape
      const migrated = {
        version: CURRENT_VERSION,
        notes: Array.isArray(data) ? data : [],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      // Do not remove old key to be non-destructive
      return migrated;
    }
  }

  // Nothing found
  const initial = { version: CURRENT_VERSION, notes: [] };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

// PUBLIC_INTERFACE
export function loadNotes() {
  /** Load notes array from localStorage, running migrations if necessary. */
  const data = migrateIfNeeded();
  if (!data || typeof data !== 'object') return [];
  if (data.version !== CURRENT_VERSION) {
    // Future-proof: attempt to coerce to current structure
    const notes = Array.isArray(data.notes) ? data.notes : [];
    const normalized = { version: CURRENT_VERSION, notes };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return notes;
  }
  return Array.isArray(data.notes) ? data.notes : [];
}

// PUBLIC_INTERFACE
export function saveNotes(notes) {
  /** Persist notes array to localStorage under the versioned key. */
  const payload = {
    version: CURRENT_VERSION,
    notes: Array.isArray(notes) ? notes : [],
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
