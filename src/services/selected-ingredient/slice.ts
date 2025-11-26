import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type TSelectedIngredientState = {
  ingredient: TIngredient | null;
};

const initialState: TSelectedIngredientState = {
  ingredient: null,
};

export const selectedIngredientSlice = createSlice({
  name: 'selectedIngredient',
  initialState,
  reducers: {
    setSelectedIngredient(state, action: PayloadAction<TIngredient>) {
      state.ingredient = action.payload;
    },
    resetSelectedIngredient(state) {
      state.ingredient = null;
    },
  },
  selectors: {
    getSelectedIngredient(state) {
      return state.ingredient;
    },
  },
});

export const { setSelectedIngredient, resetSelectedIngredient } =
  selectedIngredientSlice.actions;

export const { getSelectedIngredient } = selectedIngredientSlice.selectors;
