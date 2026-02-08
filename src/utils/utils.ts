import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { BASE_URL } from './constants';

import type { TIngredient, TOrder, TSocketState } from '@/types/types';

export function debounce(func: (...arg: unknown[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return (...arg: Parameters<typeof func>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...arg), delay);
  };
}

export const getAccessToken = (): string | null => localStorage.getItem('accessToken');
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

export async function refresh(): Promise<boolean> {
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

export const getOrderDetails = (
  order: TOrder,
  ingredients: Record<string, TIngredient>
): {
  ingredientsCounts: Record<TIngredient['_id'], number>;
  totalCost: number;
  correctIngredients: TIngredient['_id'][];
} => {
  return order.ingredients.reduce(
    (
      acc: {
        ingredientsCounts: Record<TIngredient['_id'], number>;
        totalCost: number;
        correctIngredients: TIngredient['_id'][];
      },
      ingredientId
    ) => {
      if (ingredients[ingredientId]) {
        acc.correctIngredients.push(ingredientId);
        acc.ingredientsCounts[ingredientId] =
          (acc.ingredientsCounts[ingredientId] || 0) + 1;
        acc.totalCost += ingredients[ingredientId].price;
      }

      return acc;
    },
    { ingredientsCounts: {}, totalCost: 0, correctIngredients: [] }
  );
};

export function socket<T>(
  withTokenRefresh: boolean,
  url: string
): (
  _: void,
  api: {
    updateCachedData: (updater: (draft: TSocketState<T>) => void) => void;
    cacheDataLoaded: Promise<{ data: TSocketState<T>; meta?: unknown }>;
    cacheEntryRemoved: Promise<void>;
  }
) => Promise<void> {
  return async function (
    _: void,
    api: {
      updateCachedData: (updater: (draft: TSocketState<T>) => void) => void;
      cacheDataLoaded: Promise<{ data: TSocketState<T>; meta?: unknown }>;
      cacheEntryRemoved: Promise<void>;
    }
  ): Promise<void> {
    let ws: WebSocket | null = null;
    let reconnectTimer: NodeJS.Timeout | null = null;
    const RECONNECT_DELAY = 3000;

    function onError(): void {
      api.updateCachedData((draft) => ({ ...draft, error: 'error' }));
    }

    function onOpen(): void {
      api.updateCachedData((draft) => ({ ...draft, error: null, status: 'online' }));

      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    }

    function onClose(event: CloseEvent): void {
      api.updateCachedData((draft) => ({ ...draft, status: 'offline' }));

      if (event.code !== 1000) {
        reconnectTimer = setTimeout(() => {
          connect();
        }, RECONNECT_DELAY);
      }
    }

    function onMessage(event: MessageEvent<string>): void {
      const data = event.data;

      try {
        const parsedData = JSON.parse(data) as T & { message?: string };

        if (withTokenRefresh && parsedData.message === 'Invalid or missing token') {
          refresh()
            .then(() => {
              const accessToken = getAccessToken();

              if (!accessToken) {
                api.updateCachedData((draft) => ({
                  ...draft,
                  error: 'No access token',
                }));
                return;
              }

              ws = new WebSocket(`${url}?token=${accessToken.split(' ')[1]}`);
            })
            .catch((error) => {
              api.updateCachedData((draft) => ({
                ...draft,
                error: (error as Error).message,
              }));
            });

          disconnect();

          return;
        }

        api.updateCachedData((draft) => ({ ...draft, data: parsedData }));
      } catch (error) {
        api.updateCachedData((draft) => ({
          ...draft,
          error: (error as Error).message,
        }));
      }
    }

    function disconnect(): void {
      if (ws) {
        ws.removeEventListener('message', onMessage);
        ws.removeEventListener('open', onOpen);
        ws.removeEventListener('close', onClose);
        ws.removeEventListener('error', onError);

        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close(1000, 'Disconnecting');
        }

        ws = null;
      }
    }

    function connect(): void {
      disconnect();

      if (withTokenRefresh) {
        const accessToken = getAccessToken();

        if (!accessToken) {
          api.updateCachedData((draft) => ({
            ...draft,
            error: 'No access token',
          }));
          return;
        }

        ws = new WebSocket(`${url}?token=${accessToken.split(' ')[1]}`);
      } else {
        ws = new WebSocket(url);
      }

      api.updateCachedData((draft) => ({ ...draft, status: 'connecting' }));

      ws.addEventListener('message', onMessage);
      ws.addEventListener('open', onOpen);
      ws.addEventListener('close', onClose);
      ws.addEventListener('error', onError);
    }

    function cleanup(): void {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }

      disconnect();
    }

    try {
      await api.cacheDataLoaded;
      connect();
      await api.cacheEntryRemoved;
    } catch (error) {
      api.updateCachedData((draft) => ({
        ...draft,
        error: (error as Error).message,
      }));
    } finally {
      cleanup();
    }
  };
}
