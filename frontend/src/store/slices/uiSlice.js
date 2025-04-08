import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackbar: {
    open: false,
    message: '',
    severity: 'info', // 'success' | 'info' | 'warning' | 'error'
  },
  sidebar: {
    collapsed: false,
  },
  dialogs: {
    deleteContent: {
      open: false,
      contentId: null,
    },
    shareContent: {
      open: false,
      contentId: null,
    },
    createGroup: {
      open: false,
    },
    editProfile: {
      open: false,
    },
  },
  drawer: {
    open: false,
  },
  contentEditor: {
    isDirty: false,
    isSaving: false,
    lastSaved: null,
  },
  searchDrawer: {
    open: false,
  },
  mobileMenu: {
    open: false,
  },
  theme: {
    mode: 'light', // 'light' | 'dark'
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
    openDialog: (state, action) => {
      const { dialog, data } = action.payload;
      if (state.dialogs[dialog]) {
        state.dialogs[dialog] = {
          ...state.dialogs[dialog],
          open: true,
          ...data,
        };
      }
    },
    closeDialog: (state, action) => {
      const dialog = action.payload;
      if (state.dialogs[dialog]) {
        state.dialogs[dialog] = {
          ...state.dialogs[dialog],
          open: false,
        };
      }
    },
    toggleDrawer: (state) => {
      state.drawer.open = !state.drawer.open;
    },
    setContentEditorState: (state, action) => {
      state.contentEditor = {
        ...state.contentEditor,
        ...action.payload,
      };
    },
    toggleSearchDrawer: (state) => {
      state.searchDrawer.open = !state.searchDrawer.open;
    },
  toggleMobileMenu: (state) => {
    state.mobileMenu.open = !state.mobileMenu.open;
  },
  toggleSidebar: (state) => {
    state.sidebar.collapsed = !state.sidebar.collapsed;
  },
  setThemeMode: (state, action) => {
    state.theme.mode = action.payload;
  },
  },
});

export const {
  showSnackbar,
  hideSnackbar,
  openDialog,
  closeDialog,
  toggleDrawer,
  setContentEditorState,
  toggleSearchDrawer,
  toggleMobileMenu,
  setThemeMode,
  toggleSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;
