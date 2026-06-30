import { createSlice } from '@reduxjs/toolkit';

export const ADMIN_EMAIL = 'nhubahung19@gmail.com';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const userData = {
        ...action.payload,
        isAdmin: action.payload.email === ADMIN_EMAIL,
      };
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    updateUserInfo: (state, action) => {
      // action.payload: { displayName, photoURL }
      const updated = { ...state.user, ...action.payload };
      state.user = updated;
      localStorage.setItem('user', JSON.stringify(updated));
    },
  },
});

export const { loginSuccess, logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
