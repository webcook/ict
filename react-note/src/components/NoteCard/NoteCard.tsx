import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { deleteNote, togglePin } from '../../store/slices/notesSlice';
import { setEditingNote } from '../../store/slices/uiSlice';
import { Note } from '../../types';
import './NoteCard.css';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(setEditingNote(note));
  };

  const handleDelete = () => {
    dispatch(deleteNote(note.id));
  };

  const handleTogglePin = () => {
    dispatch(togglePin(note.id));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(date));
  };

  const getColorClass = (color: string) => {
    return `note-card note-card--${color.toLowerCase()}`;
  };

  return (
    <div className={getColorClass(note.color)}>
      <div className="note-card__header">
        <h3 className="note-card__title">{note.title}</h3>
        <div className="note-card__priority">
          {note.priority === 'HIGH' && (
            <>
              <span className="priority-badge">HIGH</span>
              <button
                className="pin-button"
                onClick={handleTogglePin}
                title={note.isPinned ? '고정 해제' : '고정'}
              >
                📌
              </button>
            </>
          )}
        </div>
      </div>

      <div className="note-card__content">
        <p>{note.content}</p>
      </div>

      {note.tags.length > 0 && (
        <div className="note-card__tags">
          {note.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="note-card__footer">
        <span className="note-card__date">
          {formatDate(note.createdAt)}
        </span>
        <div className="note-card__actions">
          <button
            className="action-button edit-button"
            onClick={handleEdit}
            title="편집"
          >
            ✏️
          </button>
          <button
            className="action-button delete-button"
            onClick={handleDelete}
            title="삭제"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
