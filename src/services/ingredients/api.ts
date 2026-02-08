import { BASE_URL } from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  TGetIngredientsData,
  TGetIngredientsTranformData,
  TIngredient,
} from '@/types/types';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}ingredients/`,
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TGetIngredientsTranformData, void>({
      query: () => '',
      transformResponse: (response: TGetIngredientsData) => {
        const ingredientsArr = response.data;

        const ingredientsObj: Record<TIngredient['_id'], TIngredient> =
          ingredientsArr.reduce(
            (acc, ingredient) => ({
              ...acc,
              [ingredient._id]: ingredient,
            }),
            {}
          );

        return {
          arr: ingredientsArr,
          obj: ingredientsObj,
        };
      },
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
