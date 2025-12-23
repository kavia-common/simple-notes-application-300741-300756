import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header renders the app title and an add button.
 */
export default function Header({ onAdd }) {
  return (
    <header className="header">
      <div className="brand" aria-label="Brand">
        <div className="brand-badge" aria-hidden>✎</div>
        <div className="brand-title">Notes</div>
      </div>
      <div className="header-actions">
        <button className="btn btn-primary" onClick={onAdd} aria-label="Create new note">
          + New Note
        </button>
      </div>
    </header>
  );
}
