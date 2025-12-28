import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { ordersApi } from '../orders/api';

import type { TBurgerConstructorIngredient, TIngredient } from '@/types/types';

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
    moveIngredient(state, action: PayloadAction<{ from: string; to: string }>) {
      const { from, to } = action.payload;

      const fromIndex = state.ingredients.findIndex(({ uuid }) => uuid === from);
      const toIndex = state.ingredients.findIndex(({ uuid }) => uuid === to);

      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
        return;
      }

      const newIngredients = [...state.ingredients];

      if (fromIndex < toIndex) {
        for (let i = fromIndex; i < toIndex; i++) {
          [newIngredients[i], newIngredients[i + 1]] = [
            newIngredients[i + 1],
            newIngredients[i],
          ];
        }
      } else {
        for (let i = fromIndex; i > toIndex; i--) {
          [newIngredients[i], newIngredients[i - 1]] = [
            newIngredients[i - 1],
            newIngredients[i],
          ];
        }
      }

      state.ingredients = newIngredients;
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
    builder.addMatcher(ordersApi.endpoints.createOrder.matchFulfilled, (state) => {
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
