// 노트 우선순위 타입
export type Priority = 'LOW' | 'HIGH';

// 노트 배경색 타입
export type NoteColor = 'WHITE' | 'YELLOW' | 'PINK' | 'BLUE' | 'GREEN' | 'PURPLE';

// 노트 타입
export interface Note {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  priority: Priority;
  tags: string[];
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 태그 타입
export interface Tag {
  id: string;
  name: string;
  color?: string;
}

// 카테고리 타입
export interface Category {
  id: string;
  name: string;
  icon: string;
}

// 정렬 옵션 타입
export type SortOption = 'createdAt' | 'updatedAt' | 'title' | 'priority';

// 필터 옵션 타입
export interface FilterOptions {
  category?: string;
  tags?: string[];
  priority?: Priority;
  color?: NoteColor;
}

// 앱 상태 타입
export interface AppState {
  notes: Note[];
  tags: Tag[];
  categories: Category[];
  selectedCategory: string;
  filterOptions: FilterOptions;
  sortOption: SortOption;
  searchQuery: string;
  isCreateModalOpen: boolean;
  isTagModalOpen: boolean;
  editingNote: Note | null;
}
