import {
  clearTokens,
  createBaseQueryWithReauth,
  setTokens,
  getRefreshToken,
} from '@/utils/utils';
import { createApi } from '@reduxjs/toolkit/query/react';

import { ordersApi } from '../orders/api';

import type { TAccessTokens, TLoginBody, TUser, TUserWithPassword } from '@/types/types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: createBaseQueryWithReauth('auth/'),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<
      {
        success: boolean;
        user: TUser;
      },
      void
    >({
      query: () => 'user',
      providesTags: ['User'],
    }),
    login: builder.mutation<
      {
        success: boolean;
        user: TUser;
      } & TAccessTokens,
      TLoginBody
    >({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;

          setTokens(data.accessToken, data.refreshToken);
          dispatch(userApi.util.invalidateTags(['User']));
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    logout: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      void
    >({
      query: () => {
        const token = getRefreshToken();

        return {
          url: 'logout',
          method: 'POST',
          body: {
            token,
          },
        };
      },
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Logout failed:', error);
        } finally {
          clearTokens();

          dispatch(ordersApi.util.invalidateTags(['UserOrders']));
        }
      },
    }),
    updateUser: builder.mutation<
      {
        success: boolean;
        user: TUser;
      },
      TUserWithPassword
    >({
      query: (data) => ({
        url: 'user',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<
      {
        success: boolean;
        user: TUser;
      } & TAccessTokens,
      TUserWithPassword
    >({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;

          setTokens(data.accessToken, data.refreshToken);
          dispatch(userApi.util.invalidateTags(['User']));
        } catch (error) {
          console.error('Registration failed:', error);
        }
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useRegisterMutation,
} = userApi;
