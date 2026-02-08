import { ErrorPage } from '@/components/error-page/error-page';
import { OrderPreview } from '@/components/orders/order-preview/order-preview';
import { OrdersList } from '@/components/orders/orders-list/orders-list';
import { OrdersResults } from '@/components/orders/orders-results/orders-results';
import { useGetFeedOrdersQuery } from '@/services/orders/api';
import { routes } from '@/utils/constants';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import type { JSX } from 'react';

import styles from './orders-feed.module.css';

export const OrdersFeed = (): JSX.Element => {
  const { data, isError, isLoading } = useGetFeedOrdersQuery();
  const location = useLocation();

  if (isError || data?.error) {
    return (
      <ErrorPage
        code="500"
        content="Ошибка при загрузке ленты заказов. Пожалуйста, попробуйте позже"
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

  const NotFoundText = (
    <p
      style={{
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="text text_type_main-default"
    >
      Заказы не найдены
    </p>
  );

  return (
    <>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={styles.page}>
        {!data.data.orders || data.data.orders.length === 0 ? (
          NotFoundText
        ) : (
          <OrdersList>
            {data.data.orders.map((order) => (
              <li key={order.number}>
                <Link
                  to={`${routes.ORDERS_FEED}/${order.number}`}
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
        )}
        <OrdersResults
          todayCount={data.data.totalToday}
          totalCount={data.data.total}
          doneOrders={data.data.orders
            .filter((order) => order.status === 'done')
            .map((order) => order.number)}
          inWorkOrders={data.data.orders
            .filter((order) => order.status === 'pending')
            .map((order) => order.number)}
        />
      </div>
    </>
  );
};
