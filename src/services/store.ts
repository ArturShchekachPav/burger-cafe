import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { burgerConstructorSlice } from './constructor/slice';
import { ingredientsApi } from './ingredients/api';
import { ordersApi } from './orders/api';
import { userApi } from './user/api';

const rootReducer = combineSlices(
  ordersApi,
  burgerConstructorSlice,
  ingredientsApi,
  userApi
);

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      ingredientsApi.middleware,
      ordersApi.middleware,
      userApi.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
