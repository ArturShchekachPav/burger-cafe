import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { createOrderThunk } from '../order/actions';

import type { TBurgerConstructorIngredient, TIngredient } from '@/utils/types';

type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TBurgerConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  ingredients: [],
  bun: null,
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer(state, action: PayloadAction<TBurgerConstructorIngredient>) {
        state.ingredients.push(action.payload);
      },
      prepare(ingredient: TIngredient) {
        const uuid = uuidv4();

        return { payload: { ...ingredient, uuid } };
      },
    },
    removeIngredient(
      state,
      action: PayloadAction<Pick<TBurgerConstructorIngredient, '_id' | 'uuid'>>
    ) {
      const deleteUuid = action.payload.uuid;

      state.ingredients = state.ingredients.filter((ing) => ing.uuid !== deleteUuid);
    },
    moveIngredient(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const ingredient = state.ingredients.splice(from, 1)[0];

      state.ingredients.splice(to, 0, ingredient);
    },
  },
  selectors: {
    getBurgerConstructor(state) {
      return state;
    },
    getIsAvailableToOrder(state) {
      return Boolean(state.bun && state.ingredients.length);
    },
  },
  extraReducers(builder) {
    builder.addCase(createOrderThunk.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  },
});

export const { setBun, addIngredient, removeIngredient, moveIngredient } =
  burgerConstructorSlice.actions;

export const { getBurgerConstructor, getIsAvailableToOrder } =
  burgerConstructorSlice.selectors;

export const getTotalPrice = createSelector(
  [getBurgerConstructor],
  ({ bun, ingredients }) => {
    const bunPrice = bun ? bun.price * 2 : 0;

    const ingredientsPrice = ingredients.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );

    return bunPrice + ingredientsPrice;
  }
);

export const getSelectedIngredientIds = createSelector(
  [getBurgerConstructor],
  ({ bun, ingredients }) => {
    const ids = ingredients.map((ing) => ing._id);

    if (bun) {
      return [bun._id, ...ids, bun._id];
    }

    return ids;
  }
);
