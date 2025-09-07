import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/redux';
import NoteCard from '../NoteCard/NoteCard';
import './NotesList.css';

const NotesList: React.FC = () => {
  const notes = useAppSelector((state) => state.notes.notes);
  const searchQuery = useAppSelector((state) => state.notes.searchQuery);
  const sortOption = useAppSelector((state) => state.notes.sortOption);

  const filteredAndSortedNotes = useMemo(() => {
    let filtered = notes;

    // 검색 필터링
    if (searchQuery) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 정렬 (새로운 배열 반환)
    filtered = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'priority':
          const priorityOrder = { HIGH: 1, LOW: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'updatedAt':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'createdAt':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [notes, searchQuery, sortOption]);

  const pinnedNotes = filteredAndSortedNotes.filter((note) => note.isPinned);
  const unpinnedNotes = filteredAndSortedNotes.filter((note) => !note.isPinned);

  if (filteredAndSortedNotes.length === 0) {
    return (
      <div className="notes-list">
        <div className="empty-state">
          <p>노트가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {pinnedNotes.length > 0 && (
        <div className="notes-section">
          <h2 className="section-title">Pinned Notes ({pinnedNotes.length})</h2>
          <div className="notes-grid">
            {pinnedNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}

      {unpinnedNotes.length > 0 && (
        <div className="notes-section">
          <h2 className="section-title">All Notes ({unpinnedNotes.length})</h2>
          <div className="notes-grid">
            {unpinnedNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesList;
