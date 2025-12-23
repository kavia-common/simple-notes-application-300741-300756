import React from 'react';

/**
 * PUBLIC_INTERFACE
 * EmptyState displays an informative message with optional action.
 */
export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <h3 style={{ margin: '0 0 6px 0' }}>{title}</h3>
      <p style={{ margin: '0 0 12px 0', color: 'var(--muted)' }}>{description}</p>
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}
