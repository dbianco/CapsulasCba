import axios from 'axios';

const API_BASE_URL = '/api/users';

const UserService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        { username, password }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (user) => {
    try {
      const response = await axios.post(API_BASE_URL, user);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, user) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, user);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (userData) => {
    try {
      // Assuming the API endpoint for updating profile is /api/users/profile
      const response = await axios.put(`${API_BASE_URL}/profile`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
