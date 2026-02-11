import { describe, it, expect } from 'vitest';

import { userApi } from './api';
import { initialState, userSlice } from './slice';

const { reducerPath } = userApi;
const { reducer } = userSlice;

describe('user reducer', () => {
  it('initializes correctly', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('getUser fulfilled', () => {
    const action = {
      type: `${reducerPath}/executeQuery/fulfilled`,
      meta: {
        arg: {
          endpointName: userApi.endpoints.getUser.name,
        },
      },
    };

    expect(userApi.endpoints.getUser.matchFulfilled(action)).toBe(true);

    const state = reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isAuthChecked: true, isLoggedIn: true });
  });

  it('getUser rejected', () => {
    const action = {
      type: `${reducerPath}/executeQuery/rejected`,
      meta: {
        arg: {
          endpointName: userApi.endpoints.getUser.name,
        },
      },
    };

    expect(userApi.endpoints.getUser.matchRejected(action)).toBe(true);

    const state = reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isAuthChecked: true, isLoggedIn: false });
  });

  it('logout pending', () => {
    const action = {
      type: `${reducerPath}/executeMutation/pending`,
      meta: {
        arg: {
          endpointName: userApi.endpoints.logout.name,
        },
      },
    };

    const prevState = { ...initialState, isAuthChecked: true, isLoggedIn: false };

    expect(userApi.endpoints.logout.matchPending(action)).toBe(true);

    const state = reducer(prevState, action);

    expect(state).toEqual({ ...prevState, isLoggedIn: false });
  });
});
