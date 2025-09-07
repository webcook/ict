import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../types';

interface UIState {
  isCreateModalOpen: boolean;
  isTagModalOpen: boolean;
  editingNote: Note | null;
}

const initialState: UIState = {
  isCreateModalOpen: false,
  isTagModalOpen: false,
  editingNote: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.isCreateModalOpen = true;
    },
    closeCreateModal: (state) => {
      state.isCreateModalOpen = false;
      state.editingNote = null;
    },
    openTagModal: (state) => {
      state.isTagModalOpen = true;
    },
    closeTagModal: (state) => {
      state.isTagModalOpen = false;
    },
    setEditingNote: (state, action: PayloadAction<Note | null>) => {
      state.editingNote = action.payload;
      state.isCreateModalOpen = action.payload !== null;
    },
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  openTagModal,
  closeTagModal,
  setEditingNote,
} = uiSlice.actions;

export default uiSlice.reducer;
