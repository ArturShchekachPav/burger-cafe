import {
  useGetFeedOrdersQuery,
  useGetUserOrdersQuery,
  useLazyGetOrderQuery,
} from '@/services/orders/api';
import { useAppSelector } from '@/services/store';
import { getIsLoggedIn } from '@/services/user/slice';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { TOrder } from '@/types/types';

export function useOrderSearch(orderNumber: TOrder['number']): {
  order: TOrder | null;
  isSearching: boolean;
  isError: boolean;
} {
  const { data: feedOrders, isLoading: feedOrdersLoading } = useGetFeedOrdersQuery();
  const { data: userOrders, isLoading: userOrdersLoading } = useGetUserOrdersQuery();
  const [getOrder, { data: orderData, isLoading: orderLoading, isError: orderError }] =
    useLazyGetOrderQuery();

  const isLoggedIn = useAppSelector(getIsLoggedIn);

  const findOrderInList = useCallback(
    (orders: TOrder[] | undefined) => {
      return orders?.find((o) => o.number === orderNumber) ?? null;
    },
    [orderNumber]
  );

  const findOrderInSockets = useCallback(() => {
    const fromFeed = findOrderInList(feedOrders?.data?.orders);
    if (fromFeed) return fromFeed;

    if (isLoggedIn) {
      const fromUser = findOrderInList(userOrders?.data?.orders);
      if (fromUser) return fromUser;
    }

    return null;
  }, [feedOrders, userOrders, isLoggedIn, findOrderInList]);

  const [order, setOrder] = useState<TOrder | null>(findOrderInSockets());

  const shouldFetchOrder = useMemo(() => {
    return Boolean(
      !order &&
        isLoggedIn &&
        !orderLoading &&
        !orderData &&
        !feedOrdersLoading &&
        !userOrdersLoading
    );
  }, [order, isLoggedIn, orderLoading, orderData, feedOrdersLoading, userOrdersLoading]);

  useEffect(() => {
    if (order) return;

    const foundOrder = findOrderInSockets();
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [findOrderInSockets, feedOrdersLoading, userOrdersLoading]);

  useEffect(() => {
    if (shouldFetchOrder) {
      void getOrder(String(orderNumber))
        .unwrap()
        .then((data) => {
          setOrder(data.orders[0]);
        });
    }
  }, [shouldFetchOrder]);

  const isSearching = useMemo(() => {
    if (order) return false;

    return feedOrdersLoading || userOrdersLoading || orderLoading;
  }, [order, feedOrdersLoading, userOrdersLoading, orderLoading]);

  return {
    order: order,
    isSearching,
    isError: orderError,
  };
}
