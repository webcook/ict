import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { closeCreateModal } from '../../store/slices/uiSlice';
import { addNote, updateNote } from '../../store/slices/notesSlice';
import { openTagModal } from '../../store/slices/uiSlice';
import { NoteColor, Priority } from '../../types';
import './CreateNoteModal.css';

const CreateNoteModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isCreateModalOpen);
  const editingNote = useAppSelector((state) => state.ui.editingNote);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    color: 'WHITE' as NoteColor,
    priority: 'LOW' as Priority,
    tags: [] as string[],
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        content: editingNote.content,
        color: editingNote.color,
        priority: editingNote.priority,
        tags: editingNote.tags,
      });
    } else {
      setFormData({
        title: '',
        content: '',
        color: 'WHITE',
        priority: 'LOW',
        tags: [],
      });
    }
  }, [editingNote, isOpen]);

  const handleClose = () => {
    dispatch(closeCreateModal());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingNote) {
      dispatch(updateNote({
        ...editingNote,
        ...formData,
      }));
    } else {
      dispatch(addNote({
        ...formData,
        isPinned: false,
      }));
    }

    handleClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRemoveTag = (tagName: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagName),
    }));
  };

  const handleOpenTagModal = () => {
    dispatch(openTagModal());
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>노트 생성하기</h2>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="노트1"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="title-input"
              required
            />
          </div>

          <div className="toolbar">
            <button type="button" className="toolbar-button">📝</button>
            <button type="button" className="toolbar-button">🔢</button>
            <button type="button" className="toolbar-button">I</button>
            <button type="button" className="toolbar-button">U</button>
            <button type="button" className="toolbar-button">S</button>
            <button type="button" className="toolbar-button">A</button>
            <button type="button" className="toolbar-button">🖼️</button>
            <button type="button" className="toolbar-button">💬</button>
            <button type="button" className="toolbar-button">&lt;/&gt;</button>
          </div>

          <div className="form-group">
            <textarea
              placeholder="노트1"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              className="content-textarea"
              rows={10}
            />
          </div>

          <div className="form-controls">
            <button type="button" className="add-tag-button" onClick={handleOpenTagModal}>
              Add Tag
            </button>

            <div className="form-row">
              <label>
                배경색:
                <select
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value as NoteColor)}
                  className="color-select"
                >
                  <option value="WHITE">White</option>
                  <option value="YELLOW">Yellow</option>
                  <option value="PINK">Pink</option>
                  <option value="BLUE">Blue</option>
                  <option value="GREEN">Green</option>
                  <option value="PURPLE">Purple</option>
                </select>
              </label>

              <label>
                우선순위:
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value as Priority)}
                  className="priority-select"
                >
                  <option value="LOW">Low</option>
                  <option value="HIGH">High</option>
                </select>
              </label>
            </div>

            <button type="submit" className="create-button">
              + 생성하기
            </button>
          </div>

          {formData.tags.length > 0 && (
            <div className="selected-tags">
              {formData.tags.map((tag) => (
                <span key={tag} className="selected-tag">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="remove-tag"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal;
