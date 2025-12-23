import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * EditorModal shows a dialog to create or edit a note with title and content.
 * Accessibility:
 * - Focus management: focus title on open; trap tab within modal.
 * - ESC to close.
 * - Enter on title saves.
 */
export default function EditorModal({ isOpen, note, onClose, onSave }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const titleRef = useRef(null);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTitle(note?.title || '');
      setContent(note?.content || '');
      // Focus title field on open
      setTimeout(() => {
        titleRef.current?.focus();
        titleRef.current?.select?.();
      }, 0);
    }
  }, [isOpen, note]);

  // ESC close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Basic focus trap
  useEffect(() => {
    if (!isOpen) return;
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    modalRef.current?.addEventListener('keydown', trap);
    return () => modalRef.current?.removeEventListener('keydown', trap);
  }, [isOpen]);

  const handleSave = () => {
    const payload = {
      ...(note || {}),
      title: title.trim(),
      content: content,
    };
    onSave(payload);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="editor-title" onMouseDown={(e) => {
      // close when clicking backdrop
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal" ref={modalRef}>
        <div className="modal-header">
          <div id="editor-title" style={{ fontWeight: 700 }}>
            {note?.id ? 'Edit Note' : 'New Note'}
          </div>
          <button className="btn" onClick={onClose} ref={closeBtnRef} aria-label="Close">Close</button>
        </div>
        <div className="modal-content">
          <input
            ref={titleRef}
            className="input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            aria-label="Note title"
          />
          <textarea
            className="input"
            rows={12}
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            aria-label="Note content"
            style={{ resize: 'vertical', lineHeight: 1.45 }}
          />
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
