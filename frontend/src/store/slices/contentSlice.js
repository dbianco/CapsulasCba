import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contents: [],
  currentContent: null,
  userContents: [],
  drafts: [],
  filters: {
    type: null,
    category: null,
    educationLevel: null,
    tags: [],
  },
  pagination: {
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  },
  isLoading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContents: (state, action) => {
      state.contents = action.payload;
    },
    setCurrentContent: (state, action) => {
      state.currentContent = action.payload;
    },
    setUserContents: (state, action) => {
      state.userContents = action.payload;
    },
    setDrafts: (state, action) => {
      state.drafts = action.payload;
    },
    addContent: (state, action) => {
      state.contents.unshift(action.payload);
    },
    updateContent: (state, action) => {
      const index = state.contents.findIndex(
        (content) => content.id === action.payload.id
      );
      if (index !== -1) {
        state.contents[index] = action.payload;
      }
      if (state.currentContent?.id === action.payload.id) {
        state.currentContent = action.payload;
      }
    },
    deleteContent: (state, action) => {
      state.contents = state.contents.filter(
        (content) => content.id !== action.payload
      );
      if (state.currentContent?.id === action.payload) {
        state.currentContent = null;
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addComment: (state, action) => {
      if (state.currentContent) {
        state.currentContent.comments.push(action.payload);
      }
    },
    updateComment: (state, action) => {
      if (state.currentContent) {
        const index = state.currentContent.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );
        if (index !== -1) {
          state.currentContent.comments[index] = action.payload;
        }
      }
    },
    deleteComment: (state, action) => {
      if (state.currentContent) {
        state.currentContent.comments = state.currentContent.comments.filter(
          (comment) => comment.id !== action.payload
        );
      }
    },
    incrementViews: (state, action) => {
      const content = state.contents.find(
        (content) => content.id === action.payload
      );
      if (content) {
        content.viewCount++;
      }
      if (state.currentContent?.id === action.payload) {
        state.currentContent.viewCount++;
      }
    },
    toggleLike: (state, action) => {
      const content = state.contents.find(
        (content) => content.id === action.payload
      );
      if (content) {
        content.likeCount = content.isLiked
          ? content.likeCount - 1
          : content.likeCount + 1;
        content.isLiked = !content.isLiked;
      }
      if (state.currentContent?.id === action.payload) {
        state.currentContent.likeCount = state.currentContent.isLiked
          ? state.currentContent.likeCount - 1
          : state.currentContent.likeCount + 1;
        state.currentContent.isLiked = !state.currentContent.isLiked;
      }
    },
  },
});

export const {
  setContents,
  setCurrentContent,
  setUserContents,
  setDrafts,
  addContent,
  updateContent,
  deleteContent,
  setFilters,
  setPagination,
  setLoading,
  setError,
  addComment,
  updateComment,
  deleteComment,
  incrementViews,
  toggleLike,
} = contentSlice.actions;

export default contentSlice.reducer;
