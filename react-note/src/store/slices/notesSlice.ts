import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, Tag, SortOption, FilterOptions } from '../../types';

interface NotesState {
  notes: Note[];
  tags: Tag[];
  selectedCategory: string;
  filterOptions: FilterOptions;
  sortOption: SortOption;
  searchQuery: string;
}

const initialState: NotesState = {
  notes: [
    {
      id: '1',
      title: 'Note 1 tit...',
      content: 'Note 1 content',
      color: 'BLUE',
      priority: 'HIGH',
      tags: ['coding'],
      isPinned: true,
      createdAt: new Date('2022-10-12T14:55:00'),
      updatedAt: new Date('2022-10-12T14:55:00'),
    },
    {
      id: '2',
      title: 'Note 2 tit...',
      content: 'Note 2 content',
      color: 'PINK',
      priority: 'HIGH',
      tags: ['exercise'],
      isPinned: true,
      createdAt: new Date('2022-10-12T14:55:00'),
      updatedAt: new Date('2022-10-12T14:55:00'),
    },
    {
      id: '3',
      title: '노트1',
      content: '노트1',
      color: 'PINK',
      priority: 'HIGH',
      tags: ['exercise'],
      isPinned: false,
      createdAt: new Date('2022-10-12T14:55:00'),
      updatedAt: new Date('2022-10-12T14:55:00'),
    },
  ],
  tags: [
    { id: '1', name: 'coding' },
    { id: '2', name: 'exercise' },
    { id: '3', name: 'quotes' },
  ],
  selectedCategory: 'notes',
  filterOptions: {},
  sortOption: 'createdAt',
  searchQuery: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newNote: Note = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      state.notes.push(newNote);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = { ...action.payload, updatedAt: new Date() };
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    togglePin: (state, action: PayloadAction<string>) => {
      const index = state.notes.findIndex(note => note.id === action.payload);
      if (index !== -1) {
        state.notes[index] = {
          ...state.notes[index],
          isPinned: !state.notes[index].isPinned,
          updatedAt: new Date(),
        };
      }
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setFilterOptions: (state, action: PayloadAction<FilterOptions>) => {
      state.filterOptions = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addTag: (state, action: PayloadAction<Tag>) => {
      state.tags.push(action.payload);
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter(tag => tag.id !== action.payload);
      // 해당 태그를 사용하는 노트에서도 제거
      state.notes.forEach(note => {
        note.tags = note.tags.filter(tagName => tagName !== action.payload);
      });
    },
  },
});

export const {
  addNote,
  updateNote,
  deleteNote,
  togglePin,
  setSelectedCategory,
  setFilterOptions,
  setSortOption,
  setSearchQuery,
  addTag,
  deleteTag,
} = notesSlice.actions;

export default notesSlice.reducer;
