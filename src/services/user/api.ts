import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://norma.education-services.ru/api/auth/',
  }),
  endpoints: (builder) => ({
    getUser: builder.query<void, void>({
      query: () => 'user',
    }),
    login: builder.mutation<
      {
        success: boolean;
        accessToken: string;
        refreshToken: string;
        user: {
          email: string;
          name: string;
        };
      },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
    refreshToken: builder.mutation<
      {
        success: string;
        accessToken: string;
        refreshToken: string;
      },
      { token: string }
    >({
      query: (body) => ({
        url: 'token',
        method: 'POST',
        body,
      }),
    }),
    updateUser: builder.mutation<void, { email?: string; name?: string }>({
      query: (data) => ({
        url: 'user',
        method: 'PATCH',
        body: data,
      }),
    }),
    register: builder.mutation<
      {
        success: boolean;
        user: {
          email: string;
          name: string;
        };
        accessToken: string;
        refreshToken: string;
      },
      { email: string; password: string; name: string }
    >({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      { email: string }
    >({
      query: (data) => ({
        url: 'password-reset',
        method: 'POST',
        body: data,
      }),
    }),
    updatePassword: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      { password: string; token: string }
    >({
      query: (data) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useUpdateUserMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} = userApi;
