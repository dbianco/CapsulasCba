import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const {
  setUser,
  setToken,
  setLoading,
  setError,
  logout,
  updateUserProfile,
} = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const user = await UserService.login(credentials.username, credentials.password);
    dispatch(setUser(user));
    dispatch(setToken(user.token)); // Assuming the API returns a token
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerUser = (user) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const newUser = await UserService.register(user);
    dispatch(setUser(newUser));
    dispatch(setToken(newUser.token)); // Assuming the API returns a token
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
