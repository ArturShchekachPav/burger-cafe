import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TGetIngredientData } from '@/types/types';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://norma.education-services.ru/api/ingredients/',
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TGetIngredientData, void>({
      query: () => '',
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
