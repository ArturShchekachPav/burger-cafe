import { createSlice } from '@reduxjs/toolkit';

import { addIngredient, removeIngredient, setBun } from '../constructor/slice';
import { createOrderThunk } from '../order/actions';
import { loadIngredientsThunk } from './actions';

import type { TIngredientWithCount } from '@/utils/types';

type TIngredientsState = {
  ingredients: TIngredientWithCount[];
  isLoading: boolean;
  isError: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  isError: false,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState(state) {
      return state;
    },
    getIngredients(state) {
      return state.ingredients;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loadIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(loadIngredientsThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addIngredient, (state, action) => {
        const ingredientId = action.payload._id;
        const ingredient = state.ingredients.find((ing) => ing._id === ingredientId);

        if (ingredient) {
          ingredient.count = (ingredient.count ?? 0) + 1;
        }
      })
      .addCase(removeIngredient, (state, action) => {
        const deleteUuid = action.payload._id;
        const ingredient = state.ingredients.find((ing) => ing._id === deleteUuid);

        if (ingredient?.count) {
          ingredient.count -= 1;
        }
      })
      .addCase(setBun, (state, action) => {
        const bunId = action.payload._id;

        state.ingredients.forEach((ingredient) => {
          if (ingredient._id === bunId) {
            ingredient.count = 2;
          } else if (ingredient.type === 'bun') {
            ingredient.count = 0;
          }
        });
      })
      .addCase(createOrderThunk.fulfilled, (state) => {
        state.ingredients.forEach((ingredient) => {
          ingredient.count = 0;
        });
      });
  },
});

export const { getIngredientsState, getIngredients } = ingredientsSlice.selectors;
