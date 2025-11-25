import { createSlice } from '@reduxjs/toolkit';

import { createOrderThunk } from './actions';

import type { TCreateOrderData } from '@/utils/types';

type TOrderState = {
  order: TCreateOrderData['order'] | null;
  isLoading: boolean;
  isError: boolean;
};

const initialState: TOrderState = {
  order: null,
  isLoading: false,
  isError: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.isLoading = false;
      state.isError = false;
    },
  },
  selectors: {
    getOrderState(state) {
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrderThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const { getOrderState } = orderSlice.selectors;
