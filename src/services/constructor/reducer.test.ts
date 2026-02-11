import { v4 as uuidv4 } from 'uuid';
import { describe, it, expect } from 'vitest';

import { ordersApi } from '../orders/api';
import {
  burgerConstructorSlice,
  initialState,
  moveIngredient,
  removeIngredient,
  setBun,
} from './slice';

import type { TBurgerConstructorIngredient, TIngredient } from '@/types/types';

const ingredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

const constructorIngredient: TBurgerConstructorIngredient = {
  ...ingredient,
  uuid: uuidv4(),
};

const anotherConstructorIngredient: TBurgerConstructorIngredient = {
  ...ingredient,
  uuid: uuidv4(),
};

describe('constructor reducer', () => {
  it('initializes correctly', () => {
    const state = burgerConstructorSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('set bun', () => {
    const state = burgerConstructorSlice.reducer(initialState, setBun(ingredient));
    expect(state).toEqual({ ...initialState, bun: ingredient });
  });

  it('remove ingredient', () => {
    const state = burgerConstructorSlice.reducer(
      { ...initialState, ingredients: [constructorIngredient] },
      removeIngredient(constructorIngredient.uuid)
    );
    expect(state).toEqual(initialState);
  });

  it('moveIngredient', () => {
    const state = burgerConstructorSlice.reducer(
      {
        ...initialState,
        ingredients: [constructorIngredient, anotherConstructorIngredient],
      },
      moveIngredient({
        from: constructorIngredient.uuid,
        to: anotherConstructorIngredient.uuid,
      })
    );
    expect(state).toEqual({
      ...initialState,
      ingredients: [anotherConstructorIngredient, constructorIngredient],
    });
  });

  it('createOrder fulfilled', () => {
    const action = {
      type: `${ordersApi.reducerPath}/executeMutation/fulfilled`,
      meta: {
        arg: {
          endpointName: ordersApi.endpoints.createOrder.name,
        },
      },
    };

    expect(ordersApi.endpoints.createOrder.matchFulfilled(action)).toBe(true);

    const state = burgerConstructorSlice.reducer(
      {
        ...initialState,
        bun: ingredient,
        ingredients: [constructorIngredient, anotherConstructorIngredient],
      },
      action
    );
    expect(state).toEqual(initialState);
  });
});
