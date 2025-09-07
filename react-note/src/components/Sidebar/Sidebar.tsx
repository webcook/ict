import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setSelectedCategory } from '../../store/slices/notesSlice';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector((state) => state.notes.selectedCategory);

  const categories = [
    { id: 'notes', name: 'Notes', icon: '💡' },
    { id: 'coding', name: 'Coding', icon: '🏷️' },
    { id: 'exercise', name: 'Exercise', icon: '🏷️' },
    { id: 'quotes', name: 'Quotes', icon: '🏷️' },
    { id: 'edit', name: 'Edit Notes', icon: '✏️' },
    { id: 'archive', name: 'Archive', icon: '📦' },
    { id: 'trash', name: 'Trash', icon: '🗑️' },
  ];

  const handleCategoryClick = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Keep</h1>
      </div>
      <nav className="sidebar-nav">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`nav-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <span className="nav-icon">{category.icon}</span>
            <span className="nav-text">{category.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
