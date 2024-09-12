// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loggedInUser: null,
  message: '', // General notification message
  errorMessage: '', // Error message
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { email, password, name, mobileNumber, gender } = action.payload;
      const existingUser = state.users.find(user => user.email === email);

      if (!existingUser) {
        state.users.push({ email, password, name, mobileNumber, gender });
        state.message = 'Registration successful';
        state.errorMessage = '';
      } else {
        state.errorMessage = 'User already exists';
        state.message = '';
      }
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(user => user.email === email && user.password === password);

      if (user) {
        state.loggedInUser = { email, name: user.name, mobileNumber: user.mobileNumber, gender: user.gender };
        state.message = 'Login successful';
        state.errorMessage = '';
      } else {
        state.loggedInUser = null;
        state.errorMessage = 'Invalid email or password';
        state.message = '';
      }
    },
    logoutUser: (state) => {
      state.loggedInUser = null;
      state.message = 'Logout successful';
      state.errorMessage = '';
    },
    clearMessages: (state) => {
      state.message = '';
      state.errorMessage = '';
    }
  },
});

export const { registerUser, loginUser, logoutUser, clearMessages } = authSlice.actions;
export default authSlice.reducer;
