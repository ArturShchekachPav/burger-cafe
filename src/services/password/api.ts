import { createBaseQueryWithReauth } from '@/utils/utils';
import { createApi } from '@reduxjs/toolkit/query/react';

import type { TForgotPasswordBody, TUpdatePasswordBody } from '@/types/types';

export const passwordApi = createApi({
  reducerPath: 'passwordApi',
  baseQuery: createBaseQueryWithReauth('password-reset'),
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      TForgotPasswordBody
    >({
      query: (data) => ({
        url: '',
        method: 'POST',
        body: data,
      }),
    }),
    updatePassword: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      TUpdatePasswordBody
    >({
      query: (data) => ({
        url: '/reset',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useUpdatePasswordMutation } = passwordApi;
