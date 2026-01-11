import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { BASE_URL } from './constants';

export function debounce(func: (...arg: unknown[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return (...arg: Parameters<typeof func>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...arg), delay);
  };
}

const getAccessToken = (): string | null => localStorage.getItem('accessToken');
export const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');
export const getResetPasswordToken = (): string | null =>
  localStorage.getItem('resetPasswordToken');

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}
export const setResetPasswordToken = (): void =>
  localStorage.setItem('resetPasswordToken', 'resetPassword');

export function clearTokens(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
export const clearResetPasswordToken = (): void =>
  localStorage.removeItem('resetPasswordToken');

type TRefreshTokenData = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export async function refreshTokenQuery(refreshToken: string): Promise<void> {
  const res = await fetch(`${BASE_URL}auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  });

  const data = (await res.json()) as TRefreshTokenData;

  if (!res.ok || !data.success) throw new Error('Ошибка обновления токена');

  setTokens(data.accessToken, data.refreshToken);
}

const mutex = new Mutex();

async function refresh(): Promise<boolean> {
  if (mutex.isLocked()) {
    await mutex.waitForUnlock();
    return true;
  }

  const release = await mutex.acquire();

  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    await refreshTokenQuery(refreshToken);
    return true;
  } catch {
    clearTokens();
    return false;
  } finally {
    release();
  }
}

export const createBaseQueryWithReauth = (
  addPath: string
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}${addPath}`,
    prepareHeaders: (headers) => {
      const accessToken = getAccessToken();
      if (accessToken) headers.set('Authorization', accessToken);

      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401 && (await refresh())) {
      result = await baseQuery(args, api, extraOptions);
    }

    return result;
  };
};
