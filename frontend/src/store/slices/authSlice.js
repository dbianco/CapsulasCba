import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/UserService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await UserService.login(credentials.username, credentials.password);
      console.log('Full login response:', response);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      const response = await UserService.register(user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await UserService.updateProfile(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Try to get initial state from localStorage
const getInitialState = () => {
  try {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    let parsedUser = null;
    if (storedUser && typeof storedUser === 'string') {
      try {
        parsedUser = JSON.parse(storedUser);
      } catch (parseError) {
        console.error('Error parsing stored user data:', parseError);
      }
    }
    return {
      user: parsedUser,
      token: storedToken || null,
      isAuthenticated: !!parsedUser,
      isLoading: false,
      error: null,
    };
  } catch (error) {
    console.error('Error loading stored auth state:', error);
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    };
  }
};

const initialState = getInitialState();

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
      localStorage.setItem('token', action.payload);
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
      // Clear stored data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        console.log('Login fulfilled, payload:', action.payload); // Debug log
        if (action.payload) {
          state.user = action.payload;
          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(action.payload));
          console.log('Updated auth state:', state); // Debug log
          console.log('Stored user data in localStorage'); // Debug log
        } else {
          console.error('Login fulfilled, but payload is undefined');
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('Profile update fulfilled, payload:', action.payload); // Debug log
        state.user = { ...state.user, ...action.payload };
        console.log('Updated user state:', state.user); // Debug log
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setUser,
  setToken,
  setLoading,
  setError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
