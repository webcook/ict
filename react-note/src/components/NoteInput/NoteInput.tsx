import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { addNote } from '../../store/slices/notesSlice';
import './NoteInput.css';

const NoteInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addNote({
        title: title.trim(),
        content: '',
        color: 'WHITE',
        priority: 'LOW',
        tags: [],
        isPinned: false,
      }));
      setTitle('');
    }
  };

  return (
    <form className="note-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="노트의 제목을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-input-field"
      />
      <button type="submit" className="note-input-button">
        정렬
      </button>
    </form>
  );
};

export default NoteInput;
