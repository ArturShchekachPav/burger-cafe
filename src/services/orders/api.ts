import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TCreateOrderData, TIngredient } from '@/types/types';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://norma.education-services.ru/api/orders/',
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<TCreateOrderData, TIngredient['_id'][]>({
      query: (ingredients) => ({
        url: '',
        method: 'POST',
        body: { ingredients },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
