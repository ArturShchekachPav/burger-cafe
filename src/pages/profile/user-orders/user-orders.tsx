import { ErrorPage } from '@/components/error-page/error-page';
import { OrderPreview } from '@/components/orders/order-preview/order-preview';
import { OrdersList } from '@/components/orders/orders-list/orders-list';
import { useGetUserOrdersQuery } from '@/services/orders/api';
import { routes } from '@/utils/constants';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import type { JSX } from 'react';

export const UserOrders = (): JSX.Element => {
  const { data, isError, isLoading } = useGetUserOrdersQuery();
  const location = useLocation();

  if (isError || data?.error) {
    return (
      <ErrorPage
        code="500"
        content="Ошибка при загрузке заказов. Пожалуйста, попробуйте позже"
        backlinkTo={routes.HOME}
      />
    );
  }

  if (isLoading || !data) {
    return (
      <div style={{ margin: 'auto' }} className="pt-25 pb-25">
        <Preloader />
      </div>
    );
  }

  if (!data.data.orders || data.data.orders.length === 0) {
    return (
      <p
        style={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="text text_type_main-default"
      >
        У вас пока нет заказов
      </p>
    );
  }

  return (
    <OrdersList>
      {[...data.data.orders].reverse().map((order) => (
        <li key={order.number}>
          <Link
            to={`${routes.USER_ORDERS}/${order.number}`}
            state={{ background: location }}
            style={{
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            <OrderPreview order={order} />
          </Link>
        </li>
      ))}
    </OrdersList>
  );
};
