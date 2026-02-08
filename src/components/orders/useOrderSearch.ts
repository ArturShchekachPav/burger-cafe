import {
  useGetFeedOrdersQuery,
  useGetUserOrdersQuery,
  useLazyGetOrderQuery,
} from '@/services/orders/api';
import { useAppSelector } from '@/services/store';
import { getIsLoggedIn } from '@/services/user/slice';
import { useCallback, useEffect, useState } from 'react';

import type { TOrder } from '@/types/types';

export function useOrderSearch(orderNumber?: TOrder['number']): {
  order: TOrder | null;
  isSearching: boolean;
  isError: boolean;
} {
  const { data: feedOrders, isLoading: feedLoading } = useGetFeedOrdersQuery();
  const { data: userOrders, isLoading: userLoading } = useGetUserOrdersQuery();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const [getOrder, { isLoading: orderLoading, isError: orderError }] =
    useLazyGetOrderQuery();

  const [foundOrder, setFoundOrder] = useState<TOrder | null>(null);
  const [isSearching, setIsSearching] = useState(true);

  const findOrderInData = useCallback(
    (ordersData?: { orders: TOrder[] }) => {
      if (!ordersData?.orders || !orderNumber) return null;

      return ordersData.orders.find((order) => order.number === orderNumber) ?? null;
    },
    [orderNumber]
  );

  useEffect(() => {
    if (!orderNumber) {
      setIsSearching(false);
      return;
    }

    if (foundOrder || !isSearching) return;

    if (!feedLoading && feedOrders?.data) {
      const order = findOrderInData(feedOrders.data);
      if (order) {
        setFoundOrder(order);
        setIsSearching(false);
        return;
      }
    }

    if (isLoggedIn && !userLoading && userOrders?.data) {
      const order = findOrderInData(userOrders.data);
      if (order) {
        setFoundOrder(order);
        setIsSearching(false);
        return;
      }
    }

    if (isLoggedIn && !orderLoading && !foundOrder && !feedLoading && !userLoading) {
      getOrder(orderNumber)
        .unwrap()
        .then((data) => {
          const order = data.orders[0];
          if (order) {
            setFoundOrder(order);
          }
        })
        .catch((error) => {
          console.log('Error fetching order:', error);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }

    if (!isLoggedIn && !feedLoading && feedOrders?.data && !userLoading) {
      setIsSearching(false);
    }
  }, [feedOrders?.data, userOrders?.data, feedLoading, userLoading, orderLoading]);

  return {
    order: foundOrder,
    isSearching,
    isError: orderError,
  };
}
