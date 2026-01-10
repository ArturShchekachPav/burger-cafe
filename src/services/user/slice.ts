import { createSlice } from '@reduxjs/toolkit';

import { userApi } from './api';

type TUserState = {
  isAuthChecked: boolean;
  isLoggedIn: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsLoggedIn: (state) => state.isLoggedIn,
  },
  extraReducers(builder) {
    builder.addMatcher(userApi.endpoints.getUser.matchFulfilled, (state) => {
      state.isAuthChecked = true;
      state.isLoggedIn = true;
    });
    builder.addMatcher(userApi.endpoints.getUser.matchRejected, (state) => {
      state.isAuthChecked = true;
      state.isLoggedIn = false;
    });
    builder.addMatcher(userApi.endpoints.logout.matchPending, (state) => {
      state.isLoggedIn = false;
    });
  },
});

export const { getIsAuthChecked, getIsLoggedIn } = userSlice.selectors;
