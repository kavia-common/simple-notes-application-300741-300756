# Notes App (React SPA)

A simple, modern single‑page notes application built with React. It allows users to create, edit, delete, search, and sort notes, with automatic persistence to localStorage. The UI follows a clean light theme with subtle accents.

## Features

- Create, edit, and delete notes
- Title and content (plain text)
- Search/filter by title and content
- Sort by last updated or title
- Persist notes to localStorage with schema versioning/migrations
- Accessible editor modal with focus management
- Keyboard shortcuts:
  - Escape to close the modal
  - Enter in the title input to save
- Responsive layout for mobile and desktop

## Tech

- React 18, functional components, useState/useReducer
- No backend, all data in localStorage
- No external UI libraries

## Run Locally

In the project directory:

- Install: `npm install`
- Start: `npm start`
- Open http://localhost:3000

Build for production:

- `npm run build`

## Storage and Migration

- Storage key: `notesapp.v1.data`
- Schema versioning is handled via `storage.js`. If migration is needed (e.g., older key), basic transforms will run automatically.

## Project Structure

- src/
  - index.js, index.css
  - App.js (root layout)
  - styles/theme.css (light theme variables and layout)
  - hooks/useNotes.js (state and CRUD + storage)
  - utils/storage.js (localStorage helpers + migrations)
  - utils/filters.js (filter/sort helpers)
  - components/
    - Header.jsx
    - NotesList.jsx
    - NoteItem.jsx
    - EditorModal.jsx
    - EmptyState.jsx

## Environment

- Runs on port 3000 by default. This app does not call any backend and ignores REACT_APP_* URL variables.

## License

MIT
