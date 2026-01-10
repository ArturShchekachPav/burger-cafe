import { OrdersList } from '@/components/orders/orders-list/orders-list';
import { OrdersResults } from '@/components/orders/orders-results/orders-results';

import type { JSX } from 'react';

import styles from './orders-feed.module.css';

export const OrdersFeed = (): JSX.Element => {
  return (
    <>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={styles.page}>
        <OrdersList />
        <OrdersResults />
      </div>
    </>
  );
};
