import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { closeTagModal } from '../../store/slices/uiSlice';
import { addTag } from '../../store/slices/notesSlice';
import './TagModal.css';

const TagModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isTagModalOpen);
  const tags = useAppSelector((state) => state.notes.tags);
  const [newTagName, setNewTagName] = useState('');

  const handleClose = () => {
    dispatch(closeTagModal());
    setNewTagName('');
  };

  const handleAddNewTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagName.trim() && !tags.find(tag => tag.name === newTagName.trim())) {
      dispatch(addTag({
        id: Date.now().toString(),
        name: newTagName.trim(),
      }));
      setNewTagName('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="tag-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="tag-modal-header">
          <h2>ADD Tags</h2>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleAddNewTag} className="tag-form">
          <input
            type="text"
            placeholder="new tag..."
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="tag-input"
          />
        </form>

        <div className="existing-tags">
          {tags.map((tag) => (
            <div key={tag.id} className="tag-item">
              <span className="tag-name">{tag.name}</span>
              <button className="add-tag-button">+</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagModal;
