import { createBaseQueryWithReauth, socketObject } from '@/utils/utils';
import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  TCreateOrderData,
  TIngredient,
  TOrdersData,
  TOrdersDataWithCounts,
  TSocketState,
} from '@/types/types';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: createBaseQueryWithReauth('orders/'),
  tagTypes: ['UserOrders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation<TCreateOrderData, TIngredient['_id'][]>({
      query: (ingredients) => ({
        url: '',
        method: 'POST',
        body: { ingredients },
      }),
    }),
    getOrder: builder.query<TOrdersData, TIngredient['_id']>({
      query: (ingredientId) => ({
        url: ingredientId,
      }),
    }),
    getFeedOrders: builder.query<TSocketState<TOrdersDataWithCounts>, void>(
      socketObject<TOrdersDataWithCounts>(
        false,
        'wss://norma.nomoreparties.space/orders/all'
      )
    ),
    getUserOrders: builder.query<TSocketState<TOrdersDataWithCounts>, void>({
      ...socketObject<TOrdersDataWithCounts>(
        true,
        'wss://norma.education-services.ru/orders'
      ),
      providesTags: ['UserOrders'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useLazyGetOrderQuery,
  useGetFeedOrdersQuery,
  useGetUserOrdersQuery,
} = ordersApi;
