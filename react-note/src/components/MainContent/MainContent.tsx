import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { openCreateModal } from '../../store/slices/uiSlice';
import { setSortOption, setSearchQuery } from '../../store/slices/notesSlice';
import NoteInput from '../NoteInput/NoteInput';
import NotesList from '../NotesList/NotesList';
import './MainContent.css';

const MainContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector((state) => state.notes.selectedCategory);
  const searchQuery = useAppSelector((state) => state.notes.searchQuery);
  const sortOption = useAppSelector((state) => state.notes.sortOption);

  const handleCreateNote = () => {
    dispatch(openCreateModal());
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(e.target.value as any));
  };

  const getCategoryTitle = () => {
    const categoryMap: { [key: string]: string } = {
      notes: 'Notes',
      coding: 'Coding',
      exercise: 'Exercise',
      quotes: 'Quotes',
      edit: 'Edit Notes',
      archive: 'Archive',
      trash: 'Trash',
    };
    return categoryMap[selectedCategory] || 'Notes';
  };

  return (
    <div className="main-content">
      <div className="main-header">
        <h1 className="main-title">{getCategoryTitle()}</h1>
        <button className="create-button" onClick={handleCreateNote}>
          +
        </button>
      </div>

      {selectedCategory === 'notes' && (
        <>
          <NoteInput />
          <div className="controls">
            <input
              type="text"
              placeholder="노트 검색..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="createdAt">생성일순</option>
              <option value="updatedAt">수정일순</option>
              <option value="title">제목순</option>
              <option value="priority">우선순위순</option>
            </select>
          </div>
        </>
      )}

      <NotesList />
    </div>
  );
};

export default MainContent;
